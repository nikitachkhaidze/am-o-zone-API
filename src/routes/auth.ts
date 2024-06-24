import {Router} from 'express';
import {UserModel} from "../models/user.model";
import AES from 'crypto-js/aes';
import CryptoJS from "crypto-js/core";
import jwt from 'jsonwebtoken';

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.post('/register', async (req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: AES.encrypt(req.body.password, passwordSecret).toString(),
        });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const decryptedPassword = AES.decrypt(user.password, passwordSecret).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const jwtSecretKey = process.env.JWT_SECRET ?? '';
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, jwtSecretKey, { expiresIn: '3d' });
        const { password, ...userInfo } = user.toObject();

        res.status(200).json({ ...userInfo, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
