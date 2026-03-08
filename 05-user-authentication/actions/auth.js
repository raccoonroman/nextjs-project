'use server';

import { createUser, getUserByEmail } from '@/lib/user';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';
import { createAuthSession } from '@/lib/auth';

export const signup = async (prevState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if (password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect('/training');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { errors: { email: 'Email already exists' } };
    }
    throw error;
  }
};

export const signin = async (prevState, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const exisitingUser = getUserByEmail(email);

  if (!exisitingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials',
      },
    };
  }

  const isValidPassword = verifyPassword(exisitingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials',
      },
    };
  }

  await createAuthSession(exisitingUser.id);
  redirect('/training');
};

export const auth = (mode, prevState, formData) => {
  if (mode === 'login') {
    return signin(prevState, formData);
  }
  return signup(prevState, formData);
};

export const logout = async () => {
  await destroySession();
  redirect('/');
};
