export default function LastSalesPage({ sales }) {
  return (
    <>
      <h1>Last Sales</h1>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.product}: ${sale.amount}
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async (context) => {
  const response = await fetch('https://api.example.com/last-sales');
  const data = await response.json();
  return {
    props: {
      sales: data.sales,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
