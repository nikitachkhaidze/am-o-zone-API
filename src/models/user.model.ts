import mongoose from "mongoose";
import {User} from "../types/user.interface";

const UserSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export const UserModel = mongoose.model('User', UserSchema);
