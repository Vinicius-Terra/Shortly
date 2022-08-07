import connection from '../dbStrategy/postgres.js';

export async function urlShortener(req, res) {
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

export async function GetUrlById(req, res) {
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

export async function urlRedirector(req, res) {
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

export async function deleteUrl(req, res) {
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