'use server';

import { createUser } from '@/lib/user';
import { hashUserPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';

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
    createUser(email, hashedPassword);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { errors: { email: 'Email already exists' } };
    }
    throw error;
  }

  redirect('/training');
};
