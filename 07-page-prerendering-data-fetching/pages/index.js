import fs from 'fs/promises';
import path from 'path';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(fileContents).products;
  return {
    props: { products },
  };
}

export default HomePage;
