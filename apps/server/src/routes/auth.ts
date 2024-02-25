import express from "express"
import { userDao } from "../daos/userDao";
const router = express.Router();
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateJwt";
const saltRounds = 10;

router.post('/signup', async (req, res) =>{
    try{
        console.log({b:req.body});
        const {name, password, email} = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPerson =  await userDao.insertObj({name, password: hashedPassword, email}, 'id, name, email, created_at, updated_at')
        const payload = {
            id: newPerson.id,
            username: newPerson.name
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
        const {password, email} = req.body;
        const user = await userDao.getOneRow({where: `email = '${email}'`});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const payload = {
                    id: user.id,
                    username: user.name
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