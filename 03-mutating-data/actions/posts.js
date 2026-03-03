'use server';
import { redirect } from 'next/navigation';
import { storePost } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';

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

  let imageUrl = '';

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error('Failed to upload image');
    // errors.push('Failed to upload image');
    // return { errors };
  }

  await storePost({
    userId: 1,
    title,
    imageUrl,
    content,
  });

  redirect('/feed');
};
