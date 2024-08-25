import {Router} from 'express';
import {ProductModel} from "../models/product.model";

const router = Router();
const products = [
    {
        id: 0,
        name: 'xuy',
    }
];

router.get(`/`,async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const products = await ProductModel.find().limit(1);

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get(`/:id`,async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.post('/', (req, res) => {
   products.push(req.body);

   res.send(products);
});

export default router;
