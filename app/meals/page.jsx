import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '../components/meals/meals-grid';
import { getMeals } from '../lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Discover a variety of delicious meals shared by our community.',
};

const Meals = async () => {
  console.log('Fetching meals...');
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite meals from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home. All our meals are
          cooked with high-quality ingredients, just-in-time and of course by
          experienced chefs!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Loading meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
