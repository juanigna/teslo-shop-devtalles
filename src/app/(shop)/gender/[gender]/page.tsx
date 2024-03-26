import { getPaginatedProductsWithImages } from "@/app/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";


interface Props {
  params: {
    gender: string
  },
  searchParams: {
    page?: string;
  }
}


const labels: Record<string, string> = {
  'men': "Men",
  'women': "Women",
  'kid': "Kids",
  'unisex': "All products"
};



export default async function CategoryPage({ params: { gender }, searchParams: {page} }: Props) {
  // if(id === "kids") {
  //   notFound()
  // }

  const pageNumber = page ? parseInt(page) : 1;

  const { products, currentPages, totalPages } = await getPaginatedProductsWithImages({page: pageNumber, gender: gender as Gender})
  if(products.length === 0) redirect(`/gender/${gender}`)


  return (
    <div>
        <Title
            title={`Products for ${labels[gender]}`}
            subtitle="All products"
            className="mb-2"
        />
        <ProductGrid products={products} />
        <Pagination totalPages={totalPages} />
    </div>
  );
}
