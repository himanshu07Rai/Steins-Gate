import jwt from "jsonwebtoken";
import { HTTP_CODE } from "../utils/constants";

export const checkAuth = ({role}:{role:number})=>{
    return async (req: any, res: any, next: () => void) => {
        try{
            // console.log({r:req.user})
            if (req.user.role < role) return res.status(HTTP_CODE.NO_AUTH).json({status: HTTP_CODE.NO_AUTH, message: "Not enough privileges"});
            next();
        }catch(err){
            console.error(err);
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}