import jwt from "jsonwebtoken";
import { getAuthToken } from "../utils/getAuthHeader";
import { HTTP_HEADER } from "../utils/constants";

export const attachUser = (req:any, res: any, next:()=>void)=>{
    // if (!(req.path.startsWith('/api') || req.path.startsWith('/socket/'))) return next();
    console.log({he:req.headers});
    
    const authorization = req.headers[HTTP_HEADER.AUTH];
    console.log({authorization})
    if(!authorization){
        req.user= {}
    }else{
        const authToken = getAuthToken(authorization);
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decoded as AuthUser
    }
    console.log({as:req.user})
    return next()
}