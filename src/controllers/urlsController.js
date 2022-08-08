import connection from '../dbStrategy/postgres.js';
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet('123456789abcdefghijklmnopqrstvwxyz', 10);


export async function urlShortener(req, res) {
  try
  {
    const {url} = req.body;
    const id = res.locals.user;

    const shortUrl = nanoid();

    await connection.query(
      `
      INSERT INTO urls
      (url, "shortedUrl", "userId")
      VALUES
      ($1, $2, $3)
      `,
        [url, shortUrl, id]);
    return res.send({shortUrl: shortUrl}).status(201);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}

export async function GetUrlById(req, res) {
  const {id} = req.params;
  
  try
  {
    const {rows: response} = await connection.query(
      `
      SELECT id, "shortedUrl" as "shortUrl", url 
      FROM urls 
      WHERE id = $1
      `,
      [id]);
    if(response.length ===  0)
    {
      return res.sendStatus(404);
    } 
    return res.send(response[0]).status(200);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}

export async function urlRedirector(req, res) {
  const {shortUrl} = req.params;
  try
  {
    const {rows: response} = await connection.query(
    `
    SELECT url FROM urls WHERE "shortedUrl" = $1
    `, 
    [shortUrl]);

    if(response.length ===  0)
    {
      return res.sendStatus(404);
    }
    await connection.query(
    `
      UPDATE urls 
      SET "visitCount" = "visitCount" + 1
      WHERE "shortedUrl" = $1
    `, 
    [shortUrl]);
    return res.redirect(response[0].url);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}

export async function deleteUrl(req, res) {
  const {urlId} = req.params;
  const userId = res.locals.user;
  try
  {
    const {rows: doesUrlExist} = await connection.query(
      `
      SELECT * 
      FROM urls
      WHERE id = $1
      `,
      [urlId]);

    if (doesUrlExist.length === 0)
    {
      return res.sendStatus(404);
    }

    const {rows: doesUserOwnUrl} = await connection.query(
      `
      SELECT * 
      FROM urls
      WHERE urls."userId" = $1 AND urls.id = $2
      `,
      [userId, urlId]);

    if (doesUserOwnUrl.length === 0)
    {
      return res.sendStatus(401);
    }
    await connection.query(
      `
        DELETE FROM urls
        WHERE urls."userId" = $1 AND urls.id = $2
      `,
      [userId, urlId]);

    return res.sendStatus(204);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}