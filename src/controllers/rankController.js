import connection from '../dbStrategy/postgres.js';

export async function getRank(req, res) {
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