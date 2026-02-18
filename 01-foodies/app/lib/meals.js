import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({ region: 'eu-north-1' });
const db = sql('meals.db');

export const getMeals = async () => {
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = (mealSlug) => {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(mealSlug);
};

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true, strict: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();
  s3.putObject({
    Bucket: 'nextjs-udemy',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;
  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (
                  @title, @summary, @instructions, @creator, @creator_email, @image, @slug)`,
  ).run(meal);
};
