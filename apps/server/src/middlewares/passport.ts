import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userDao } from '../daos/userDao';

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credentials:', username, password);
        const user = await userDao.getOneRow({ where: `name = '${username}'`});
        console.log('User:', user);
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        const isPasswordMatch = await user.password === password;
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

export const localAuthMiddleware = passport.authenticate('local', {session: false})

export default passport;