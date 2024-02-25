import Dao from './dao';

class UserDao extends Dao {
    constructor() {
        super('user_auth');
    }
}

export const userDao = new UserDao();