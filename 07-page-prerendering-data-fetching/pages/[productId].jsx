import fs from 'fs/promises';
import path from 'path';

export default function ProductDetailPage(props) {
  const { product } = props;
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  // const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  return {
    paths: [{ params: { productId: 'p1' } }],
    fallback: 'blocking', // 'blocking' or true for fallback pages, false for no fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(fileContents).products;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return {
      notFound: true, // Return 404 if the product is not found
    };
  }
  return {
    props: { product },
  };
}
