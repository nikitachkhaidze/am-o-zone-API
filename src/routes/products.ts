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
        const products = await ProductModel.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.post('/', (req, res) => {
   products.push(req.body);

   res.send(products);
});

export default router;
