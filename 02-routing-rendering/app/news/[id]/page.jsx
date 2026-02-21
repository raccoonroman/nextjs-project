export default function NewsDetailPage({ params }) {
  return (
    <div>
      <h1>News Details Page: {params.id}</h1>
      <p>This is the news item page for {params.id}.</p>
    </div>
  );
}
