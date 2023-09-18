import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { Product } from "../entity/Product"



export class ProductController {
    static new = async (req: Request, res: Response) => {


        try {

            const { name, description, price } = req.body
            const product = new Product()
            product.name = name
            product.description = description
            product.price = price
            await AppDataSource.getMongoRepository(Product).save(product)
            return res.status(200).json(product)
        } catch (error) {
            return res.status(400).json(error)
        }

    }
}