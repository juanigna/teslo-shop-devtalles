export const revalidate = 60;

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "../actions";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({searchParams: { page }}: Props) {

  const pageNumber = page ? parseInt(page) : 1;

  const { products, currentPages, totalPages } = await getPaginatedProductsWithImages({page: pageNumber})

  if(products.length === 0) redirect('/')

  return (
    <>
      <Title 
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
