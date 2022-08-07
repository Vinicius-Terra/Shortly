import connection from '../dbStrategy/postgres.js';


export async function signUp(req, res) {
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

export async function signIn(req, res) {
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


