import jwt from "jsonwebtoken";
import { HTTP_CODE } from "../utils/constants";
import { Request, Response, NextFunction } from "express";

// export const checkAuth = ({role}:{role:number})=>{
//     return async (req: any, res: any, next: () => void) => {
//         try{
//             // console.log({r:req.user})
//             if (req.user.role < role) return res.status(HTTP_CODE.NO_AUTH).json({status: HTTP_CODE.NO_AUTH, message: "Not enough privileges"});
//             next();
//         }catch(err){
//             console.error(err);
//             res.status(401).json({ error: 'Invalid token' });
//         }
//     }
// }

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" });
  }
  const token = authHeader.split(" ")[1];

  //   * Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    req.user = user as AuthUser;
    next();
  });
};

export default checkAuth;