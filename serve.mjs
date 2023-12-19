import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import bodyParser from 'body-parser';

const app = express()
const port = 5000
const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
const certificate = fs.readFileSync('selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const agent = new https.Agent({
  rejectUnauthorized: false
})

let options = {
  method: 'POST',
  agent: agent,
  headers: {
    Authorization: "Basic Zm9ydGgtYWRtaW46MTIzNDU=",
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
  }
}; 

app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  console.log(req.query)
  let url = 'https://139.91.58.16/metadata/records?';

  const keys = Object.keys(req.query);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = req.query[key];
    if (value === '') {
      continue
    }
    url += `${key}=${value}&`;
  }
  console.log(url)
  const resp = await fetch(url, options)
  const respp = await resp.text();

  res.send(respp)
});

app.get('/upload', async (req, res) => {
  let url = 'https://139.91.58.16/metadata/record';

  let data = req.query;
  data["dataOwners"] = [req.query.dataOwners];
  options.body = data;
  console.log(data)
  // const resp = await fetch(url, options)
  // const respp = await resp.text();
  // console.log(respp)
  res.send({status: 200})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});