import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { ObjectId } from "mongodb";
import { validate } from "class-validator";

//Se crea la clase ProductController con los metodos new, getAll, getById, delete, update
export class ProductController {
  //Se crea el metodo new para crear un nuevo producto
  static new = async (req: Request, res: Response) => {
    try {
      const { name, description, price } = req.body;
      // console.log(name, description, price);
      const product = new Product();
      product.name = name;
      product.description = description;
      product.price = price;
      const validationOpt = {
        validationError: { target: false, value: false },
      };
      const errors = await validate(product, validationOpt);
      if (errors.length > 0) return res.status(400).json(errors);
      await AppDataSource.getMongoRepository(Product).save(product);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  //Se crea el metodo getAll para obtener todos los productos
  static getAll = async (req: Request, res: Response) => {
    try {
      const products = await AppDataSource.getMongoRepository(Product).find();
      if (products.length === 0)
        return res.status(404).json({ message: "Products not found" });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  //Se crea el metodo getById para obtener un producto por su id
  static getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id);
      const objectId = new ObjectId(id);
      let product: Product;
      const productRepo = AppDataSource.getMongoRepository(Product);
      product = await productRepo.findOneByOrFail(objectId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //Se crea el metodo delete para eliminar un producto por su id
  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const productRepo = AppDataSource.getMongoRepository(Product);
      const product = await productRepo.findOneByOrFail(new ObjectId(id));
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      await productRepo.remove(product);
      return res.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  //Se crea el metodo update para actualizar un producto por su id
  static update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const productRepo = AppDataSource.getMongoRepository(Product);
      const product = await productRepo.findOneByOrFail(new ObjectId(id));
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      product.name = name;
      product.description = description;
      product.price = price;
      await productRepo.save(product);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
