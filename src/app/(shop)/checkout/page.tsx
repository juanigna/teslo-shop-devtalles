import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { formatPrice } from "@/utils/priceFormatter";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [initialData.products[0], initialData.products[2], initialData.products[4]]

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px] ">

          <Title title="Verify order"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Cart */}

            <div className="flex flex-col mt-5">
              <span className="text-xl">Edit producta</span>
              <Link href={'/cart'} className="underline mb-5">Edit cart</Link>
            

            {/* Items */}

            {
              productsInCart.map(product => (
                <div key={ product.slug } className="flex mb-5">
                  <Image 
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    style={{
                      width:'100px',
                      height: '100px'
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{ product.title }</p>
                    <p>{ formatPrice(product.price) } x 3</p>
                    <p className="font-bold">Subtotal: {formatPrice(product.price * 3)}</p>
                  </div>
                </div>
              ))
            }
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl  shadow-xl p-7">

                <h2 className="text-2xl mb-2 font-bold">Ship address</h2>
                <div className="mb-10">
                  <p className="text-xl">Juan Ignacio Bocchi</p>
                  <p>Av. Ortiz de ocampo</p>
                  <p>Barrio General paz</p>
                  <p>Cordoba Capital</p>
                  <p>Cordoba</p>
                  <p>CP F5000</p>
                  <p>3826436276</p>
                </div>

                {/* Divider */}

                <div className="w-full h-0.5 rounded bg-gray-200 mb-10"/>


                <h2 className="text-2xl mb-2">Order summary</h2>

                <div className="grid grid-cols-2">

                  <span>No. Products</span>
                  <span className="text-right">3 products</span>
                  
                  <span>Subtotal</span>
                  <span className="text-right">{formatPrice(100)}</span>

                  <span>Taxation (15%)</span>
                  <span className="text-right">{formatPrice(15)}</span>

                  <span  className="mt-5 text-2xl">Total: </span>
                  <span className="text-right text-2xl mt-5">{formatPrice(115)}</span>

                  
                </div>
                <div className="mt-5 mb-2 w-full">
                  <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                      When you click "Add order" you accept our <Link href={'#'} className="underline">terms and conditions.</Link>
                    </span>

                  </p>

                  <Link href={'/orders/123'} className="flex btn-primary justify-center">
                    Add order
                  </Link>
                </div>
            </div>
          </div>
      </div>

    </div>
  );
}