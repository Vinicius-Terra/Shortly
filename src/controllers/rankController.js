import connection from '../dbStrategy/postgres.js';

export async function getRank(req, res) {
  try
  {
    const {rows: rank} = await connection.query(
    `
    SELECT 
    users.id AS id,
    users.name AS name,
    COUNT(urls.url) AS "linksCount",
    SUM(urls."visitCount") AS "visitCount"
    FROM users
    LEFT JOIN urls ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" 
    LIMIT 10
    `);
    return res.send(rank).status(200);
  }
  catch(err)
  {
    console.log(err)
    return res.send(err).status(500);
  }
}