import { DUMMY_NEWS } from '@/dummy-news';
import { NewsList } from '@/components/news-list';

export default function NewsPage() {
  return (
    <>
      <h1>News</h1>
      <ul className="news-list">
        <NewsList news={DUMMY_NEWS} />
      </ul>
    </>
  );
}
