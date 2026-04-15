import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(fileContents).products;

  if (!products) {
    return {
      redirect: {
        destination: '/no-data', // Redirect to a custom page if no products are found
        permanent: false, // Set to true if the redirect is permanent (301)
      },
    };
  }
  return {
    props: { products },
    revalidate: 60, // Revalidate the page every 60 seconds
    // notFound: false, // Return 404 if the page is not found
  };
}

export default HomePage;
