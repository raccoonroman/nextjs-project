'use server';
import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';

export const createPost = async (prevState, formData) => {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title.trim().length) {
    errors.push('Title is required');
  }

  if (!content.trim().length) {
    errors.push('Content is required');
  }

  if (!image || !image.size) {
    errors.push('Image is required');
  }

  if (errors.length) {
    return { errors };
  }

  await storePost({
    userId: 1,
    imageUrl: '',
    title,
    content,
  });

  redirect('/feed');
};
