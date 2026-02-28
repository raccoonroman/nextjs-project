import { DUMMY_NEWS } from '@/dummy-news';
import { notFound } from 'next/navigation';

export default function ImagePage({ params }) {
  const { slug } = params;
  const newsItem = DUMMY_NEWS.find((item) => item.slug === slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={slug} />
    </div>
  );
}
