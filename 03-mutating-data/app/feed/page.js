import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export const generateMetadata = async (config) => {
  const posts = await getPosts();
  return {
    title: `Feed - ${posts.length} posts`,
    description: `See all the posts from your friends and family. There are currently ${posts.length} posts in your feed.`,
  };
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
