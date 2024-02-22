import pgClient from "../services/db";

const DaoQ = {
    TIMEOUT: 240000, // 4 minutes, https://github.com/mysqljs/mysql#timeouts
    GET_ALL_ROWS: `SELECT * FROM `,
    INSERT_OBJ: `INSERT INTO `,
};

export default class Dao {
    tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getAllRows({
        where,
        orderBy,
        limit
    }: {
        where?: string,
        orderBy?: string,
        limit?: number | null
    }) {
        let values: Array<string | number> = [];
        let whereClause = '';
        if (where) {
            whereClause = ` WHERE ${where}`;
        }

        let orderByClause = '';
        if (orderBy) {
            orderByClause = ` ORDER BY ${orderBy}`;
        }

        let limitClause = '';
        if (limit) {
            limitClause = ` LIMIT $${values.length + 1}`;
            values.push(limit);
        }

        const sql = `${DaoQ.GET_ALL_ROWS}${this.tableName}${whereClause}${orderByClause}${limitClause}`;
        const query = {
            text:sql,
            values
        };

        console.log("query", query);
        try {
            const result = await pgClient.query(query);
            return result.rows;
        } catch (err) {
            console.error("Error executing query:", err);
            throw err;
        }
    }

    async insertObj(obj: any) {
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        const placeholders = keys.map((k, i) => `$${i + 1}`);
        const sql = `${DaoQ.INSERT_OBJ}${this.tableName} (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`
        const query = {
            text: sql,
            values
        };
        console.log("query", query);
        try {
            const result = await pgClient.query(query);
            return result.rows[0];
        } catch (err) {
            console.error("Error executing query:", err);
            throw err;
        }
    }
}
