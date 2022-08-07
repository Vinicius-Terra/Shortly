import connection from '../dbStrategy/postgres.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function signUp(req, res) {
  const user = req.body;

  try
  {
    const {rows: emailAreadyUsed} = await connection.query(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [user.email]);

    if(emailAreadyUsed.length !== 0){
        return res.sendStatus(409);
    }
    
    delete user.confirmPassword;

    const hashPassword = bcrypt.hashSync(user.password, 10);

    await connection.query(`
    INSERT INTO users
    (name, email, password)
    VALUES
    ($1, $2, $3)`,
    [user.name, user.email, hashPassword]);

    return res.sendStatus(201);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}

export async function signIn(req, res) {
  const login = req.body;

  try
  {
    const {rows: user} = await connection.query(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [login.email]);

    
    //its only check password if it has found a user 
    if(user.length !==0 && bcrypt.compareSync(login.password, user[0].password))
    {
      const token = jwt.sign({id: user[0].id}, SECRET, {expiresIn: "3h"});

      const {rows: tokens} = await connection.query(
        `
        SELECT * FROM tokens
        WHERE "userId" = $1
        `,
      [user[0].id]);

      if(tokens[0]){
        const {rows: tokens} = await connection.query(
          `
          UPDATE tokens 
          SET token=$1 WHERE "userId" = $2;
          `,
        [token, user[0].id]);
      }
      else{
        //frist user login
        const {rows: tokens} = await connection.query(
        `
        INSERT INTO tokens
        (token, "userId")
        VALUES
        ($1, $2)
        `,
        [token, user[0].id]);
      }

      return res.send(token).status(200);
    }
    else
    {
      return res.sendStatus(401);
    }
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}

export async function getUserData(req, res) {

  try
  {
    return res.send("").status(200);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}


