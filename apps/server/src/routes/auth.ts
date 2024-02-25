import express from "express"
import { userDao } from "../daos/userDao";
const router = express.Router();
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateJwt";
import { USER_ROLE } from "../utils/constants";
const saltRounds = 10;

router.post('/signup', async (req, res) =>{
    try{
        const {username, password, email, isAdmin} = req.body;
        // check if username or email already exists
        const user = await userDao.getOneRow({
            where: `username = '${username}' or email = '${email}'`
        })
        if(user){
            return res.status(400).json({
                error: 'Invalid username or email'
            })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPerson =  await userDao.insertObj({username, password: hashedPassword, email, role: isAdmin ? USER_ROLE.ADMIN : USER_ROLE.USER}, 'id, username, role, email, created_at, updated_at')
        const payload = {
            id: newPerson.id,
            username: newPerson.username,
            role: newPerson.role
        }
        const token = generateToken(payload);
        res.status(200).json({response: newPerson, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/login', async (req, res) =>{
    try{
        const {password, username} = req.body;
        const user = await userDao.getOneRow({where: `username = '${username}'`});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
                const token = generateToken(payload);
                res.status(200).json({token});
            }
            else{
                res.status(401).json({error: 'Invalid Credentials'});
            }
        }
        else{
            res.status(401).json({error: 'Invalid Credentials'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

export default router;