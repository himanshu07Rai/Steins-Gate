import jwt from 'jsonwebtoken';

export const generateToken = (userData: any) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}