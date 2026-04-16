import fs from 'fs/promises';
import path from 'path';

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContents);
};

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
  const data = await getData();
  return {
    paths: data.products.map((product) => ({ params: { productId: product.id } })),
    fallback: true, // 'blocking' or true for fallback pages, false for no fallback
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const data = await getData();
  const product = data.products.find((p) => p.id === productId);
  if (!product) {
    return {
      notFound: true, // Return 404 if the product is not found
    };
  }
  return { props: { product } };
}
