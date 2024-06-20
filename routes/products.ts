import {Router} from 'express';

const router = Router();

export const productsRoute = router.get(`/`,(req, res) => {
    const products = [
        {
            id: 0,
            name: 'xuy',
        }
    ];

    res.send(products);
})
