import Dao from './dao';

class MessageDao extends Dao {
    constructor() {
        super('message');
    }
}

export const messageDao = new MessageDao();