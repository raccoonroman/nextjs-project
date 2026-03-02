import { Suspense } from 'react';
import Link from 'next/link';

import { NewsList } from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';

const FilterHeader = async ({ year, month }) => {
  const awailableYears = await getAvailableNewsYears();
  let links = awailableYears;

  if (
    (year && !awailableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error('Invalid year or month filter');
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

const FilteredNews = async ({ year, month }) => {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }

  if (!news) {
    return <p>No news found for this filter</p>;
  }

  return <NewsList news={news} />;
};

export default async function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
}
