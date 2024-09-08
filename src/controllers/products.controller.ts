import {pool} from "../index";
import {Product} from "../types/product.interface";
import {mapKeysToCamelCase} from "../utils/map-keys-to-camel-case";
import { Request, Response } from 'express';
import {QueryConfig} from "pg";

class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const pageSize = +(req.query.pageSize ?? 10);
            const page = +(req.query.page ?? 1);
            const offset = pageSize * (page - 1);

            const query: QueryConfig = {
                text: 'SELECT * FROM product ORDER BY id LIMIT $1 OFFSET $2',
                values: [pageSize, offset],
            };
            const productsQueryResult = await pool.query<Product>(query);
            const products = productsQueryResult.rows;

            const totalProductsQuery = await pool.query('SELECT COUNT(*) FROM product');

            const response = {
                products: products.map(mapKeysToCamelCase),
                total: totalProductsQuery.rows[0].count,
            };

            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err })
        }
    }

    async getOneProduct(req: Request, res: Response) {
        try {
            const query: QueryConfig = {
                text: 'SELECT * FROM product WHERE id = $1',
                values: [req.params.id],
            };
            const productsQueryResult = await pool.query<Product>(query);
            const product = productsQueryResult.rows[0];

            res.status(200).json(mapKeysToCamelCase(product));
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categoriesQueryResult = await pool.query<{ categories: string[] }>('SELECT array_agg(name) as categories FROM category');
            const categories = categoriesQueryResult.rows[0].categories;

            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: err })
        }

    }
}

export const productController = new ProductController();
