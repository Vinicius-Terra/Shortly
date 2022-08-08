import jwt  from "jsonwebtoken";
import connection from '../dbStrategy/postgres.js';

const SECRET = process.env.ACCESS_TOKEN_SECRET;

export default async function validateToken (req, res, next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    
    if(token === null)
    {
        return res.sendStatus(401);
    } 
    
    const {rows: user} = await connection.query(
        `
        SELECT * FROM tokens
        WHERE token = $1
        `,
        [token]);

    jwt.verify(token, SECRET, (err) => {
        if(err)
        { 
            return res.sendStatus(401);
        }
        if(user.length === 0)
        {
            return res.sendStatus(401);
        }
        
        res.locals.user = user[0].userId;
        next();
    });
};