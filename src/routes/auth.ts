import {Router} from 'express';
import {UserModel} from "../models/User";
import AES from 'crypto-js/aes';

const router = Router();

router.post('/register', async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: AES.encrypt(req.body.password, process.env.PASSWORD_SECRET ?? '').toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
