import { Router } from 'express';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js/core';
import jwt from 'jsonwebtoken';
import { knex } from '../index';

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.post('/register', async (req, res) => {
  try {
    const savedUser = await knex('user')
      .insert({
        username: req.body.username,
        email: req.body.email,
        password: AES.encrypt(req.body.password, passwordSecret).toString(),
      })
      .returning(['id', 'username', 'email', 'isAdmin', 'createdAt']);

    res.status(201).json(savedUser[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await knex('user')
      .select()
      .where({ username: req.body.username })
      .first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const decryptedPassword = AES.decrypt(user.password, passwordSecret).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== req.body.password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const jwtSecretKey = process.env.JWT_SECRET ?? '';
    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin,
    }, jwtSecretKey, { expiresIn: '3d' });
    const { password, ...userInfo } = user;

    res.status(200).json({ ...userInfo, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
