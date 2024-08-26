import {Router} from 'express';
import {QueryConfig} from "pg";
import {Product} from "../types/product.interface";
import {pool} from "../index";
import {mapKeysToCamelCase} from "../utils/map-keys-to-camel-case";

const router = Router();

router.get(`/`, async (req, res) => {
    try {
        const productsQueryResult = await pool.query<Product>('SELECT * FROM product');
        const products = productsQueryResult.rows;

        res.status(200).json(products.map(mapKeysToCamelCase));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
})

router.get(`/:id`,async (req, res) => {
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
})

export default router;
