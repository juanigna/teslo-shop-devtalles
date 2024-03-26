"use client"

import { getStockBySlug } from "@/app/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props { 
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState<number>(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStock();
    }, [slug])

    const getStock = async () => {
        const stock = await getStockBySlug(slug);

        setStock(stock);
        setLoading(false)
    }

    return (   
        <>
            {
                loading ? (
                    <h1 className={`${ titleFont.className } antialiased font-bold text-xl bg-gray-200 animate-pulse rounded-sm`}>
                        &nbsp;
                    </h1>
                ) : (
                    <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
                        Stock: { stock  }
                    </h1>
                )
            }

            
        </>     
    )
}