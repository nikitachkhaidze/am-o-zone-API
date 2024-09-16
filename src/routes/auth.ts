import { Router } from 'express';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js/core';
import jwt from 'jsonwebtoken';
import { QueryConfig } from 'pg';
import { User } from '../types/user.interface';
import { pool } from '../index';
import { mapKeysToCamelCase } from '../utils/map-keys-to-camel-case';

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.post('/register', async (req, res) => {
  try {
    const query: QueryConfig = {
      text: 'INSERT INTO "user"(username, email, password) VALUES($1, $2, $3) RETURNING *',
      values: [req.body.username, req.body.email, AES.encrypt(req.body.password, passwordSecret).toString()],
    };
    const userQueryResult = await pool.query<User>(query);
    const savedUser = userQueryResult.rows[0];

    res.status(201).json(mapKeysToCamelCase(savedUser));
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const query: QueryConfig = {
      text: 'SELECT * FROM "user" WHERE username = $1',
      values: [req.body.username],
    };
    const userQueryResult = await pool.query<User>(query);
    const user = userQueryResult.rows[0];

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

    res.status(200).json(mapKeysToCamelCase({ ...userInfo, accessToken }));
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
