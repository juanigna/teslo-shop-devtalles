"use server"

import { sleep } from "@/utils/sleep";

export const getStockBySlug = async ( slug: string ) => {
    try{
        const stock = await prisma?.product.findFirst({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        })


        return stock?.inStock ?? 0;


    }catch(error){
        console.log(error)
        throw new Error("Error looking for a product.");
    }
}