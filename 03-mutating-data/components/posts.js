'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';

import { formatDate } from '@/lib/format';
import { togglePostLikeStatus } from '@/actions/posts';
import LikeButton from './like-icon';

const imageLoader = (config) => {
  const urlStart = config.src.split('upload/')[0];
  const urlEnd = config.src.split('upload/')[1];
  const trafsormations = `w_200,q_${config.quality}`;
  return `${urlStart}upload/${trafsormations}/${urlEnd}`;
};

function Post({ post, handleLikeToggle }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          width={200}
          height={120}
          quality={80}
          alt={post.title}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={handleLikeToggle.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      return prevPosts.map((post) => {
        if (post.id === updatedPostId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      });
    },
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const handleLikeToggle = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} handleLikeToggle={handleLikeToggle} />
        </li>
      ))}
    </ul>
  );
}
