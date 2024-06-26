import prisma from "../lib/prisma"
import { initialData } from "./seed"

async function main(){

    //Delete all data
    
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    

    // Categories
    const {categories, products} = initialData

    const categoriesData = categories.map(category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany()

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[category.name.toLowerCase() ] = category.id;
        return map
    }, {} as Record<string, string> )

    // Productos

    
    products.forEach(async (product) => {
        const {type, images, ...rest} = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })


        //Images

        const imgData = images.map(img => ({
            url: img,
            productId: dbProduct.id
        })) 

        await prisma.productImage.createMany({
            data: imgData
        })
    })

    console.log('Seed executed correctly')
}

(() => {
    if(process.env.NODE_ENV === 'production') return

    main()
})()