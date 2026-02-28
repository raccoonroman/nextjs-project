'use client';

export default function FilterPage({ error }) {
  return (
    <div id="error">
      <h1>Error</h1>
      <p>{error?.message || 'Invalid year or month filter'}</p>
    </div>
  );
}
