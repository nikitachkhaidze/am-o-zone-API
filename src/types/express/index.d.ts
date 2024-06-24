import {User} from "./src/types/user.interface";

declare global {
    declare namespace Express {
        interface Request {
            user?: User;
        }
    }
}


