'use client';

import { useFormState } from 'react-dom';

import FormSubmit from '@/components/form-submit';
import { createPost } from '@/actions/posts';

export default function NewPostPage() {
  const [formState, formAction] = useFormState(createPost, {});
  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
      </form>
      {formState.errors?.length && (
        <>
          <p>There were some errors with your submission:</p>
          <ul className="form-errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
