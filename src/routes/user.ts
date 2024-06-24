import {Router} from 'express';
import {verifyAuthorization} from "./verify-authorization";
import {UserModel} from "../models/user.model";
import AES from "crypto-js/aes";

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.put('/:id', verifyAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = AES.encrypt(req.body.password, passwordSecret).toString()
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true },
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

export default router;
