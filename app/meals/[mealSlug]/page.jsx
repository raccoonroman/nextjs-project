export default function MealsDetailPage({ params }) {
  const { mealSlug } = params;
  return <h1>Meal Detail Page for {mealSlug}</h1>;
}
