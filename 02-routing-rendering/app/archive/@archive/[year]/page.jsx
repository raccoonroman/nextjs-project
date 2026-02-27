import { NewsList } from '@/components/news-list';
import { getNewsForYear } from '@/lib/news';

export default function FilteredNewsPage({ params }) {
  const newsYear = params.year;
  const news = getNewsForYear(newsYear);
  return (
    <>
      <h1>News for {newsYear}</h1>
      <NewsList news={news} />
    </>
  );
}
