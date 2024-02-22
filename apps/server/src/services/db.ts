import { Client } from 'pg';

const pgClient = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: 5432,
});

async function connectToDatabase() {
    try {
        await pgClient.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Connection to the database failed', err);
    }
}

connectToDatabase();

export default pgClient;
