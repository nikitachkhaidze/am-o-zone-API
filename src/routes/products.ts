import {Router} from 'express';

const router = Router();
const products = [
    {
        id: 0,
        name: 'xuy',
    }
];

router.get(`/`,(req, res) => {
    res.send(products);
})

router.post('/', (req, res) => {
   products.push(req.body);

   res.send(products);
});

export default router;
