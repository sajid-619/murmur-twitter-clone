import { Request, Response, NextFunction } from 'express';
import jwt , { Secret, JwtPayload }from 'jsonwebtoken';


export const auth_check = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        if(!req.headers.authorization){
            throw new Error("Authorization header not found")
        }
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            throw new Error("Token to found on the header")
        }
        const secret: Secret = process.env.JWT_SECRET_KEY || "";
        const decodeToken: JwtPayload | any  = jwt.verify(token, secret);
        if(!decodeToken){
            throw new Error("Invalid auth token")
        }

        req.body.authUserId = decodeToken?.id;

        next()

    }
    catch (error: any) {
        return res.status(404).json({
            status:"Failed to authorize User",
            message:error.message,
            error:true
        })
    }
    
}