import sql from 'better-sqlite3';

const db = sql('meals.db');

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = (mealSlug) => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(mealSlug);
};
