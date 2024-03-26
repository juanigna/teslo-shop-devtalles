export const revalidate = 604800;

import { getProductBySlug } from "@/app/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { formatPrice } from "@/utils/priceFormatter";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 


  return {
    title: product?.title ?? "",
    description: product?.description  ?? "",
    openGraph: {
      title: product?.title ?? "",
    description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function Product({params: { slug }}: Props) {

  const product = await getProductBySlug(slug);

  if(!product) {
    return notFound()
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3  ">

      {/* Mobile Slideshow */}
      <ProductMobileSlideShow 
        title={ product.title }
        images={ product.images }
        className="block md:hidden"
      />

      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Products details */}
      <div className="col-span-1 px-5">

        <StockLabel  slug={product.slug} />

        <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
          { product.title }
        </h1>

        <p className="text-lg mb-5 ">{ formatPrice(product.price) }</p>

        {/* Sizes selector */}
        <SizeSelector 
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Quantity selector */}
        <QuantitySelector 
          quantity={2}
        />

        {/* Button */}

        <button className="btn-primary my-5">
          Add to cart
        </button>

        {/* Description */}

        <h3 className="text-sm font-bold">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}