import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export function accessToken(id:number|string):any{
    if (!process.env.SECRET) {
        throw new Error('Secret key is not defined in environment variables');
    }
    return jwt.sign({id},process.env.SECRET,{expiresIn:"60m"})
}