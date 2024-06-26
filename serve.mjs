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
  method: 'GET',
  agent: agent,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q3R0eXZpUWlkZ052ZVdOZFNzR244ajN1MGlKRG13U0I1S19LS2hVbVNrIn0.eyJleHAiOjE3MDMxNzkyMjIsImlhdCI6MTcwMzE1MDQyMiwianRpIjoiZDIyM2JhNDMtZmU1Ni00ZGM3LTgyODEtMzFlNjE1ZGU4MGE1IiwiaXNzIjoiaHR0cDovLzEzOS45MS41OC4xNjozMDY2OC9yZWFsbXMvTmV4dEdFTSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzMyN2UzMC05MDVmLTQ2MjItOTJjZS02NGY2ZjgxNDJiNTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuaWtoLWF1dGgiLCJzZXNzaW9uX3N0YXRlIjoiZmVjOTQ0ZjQtMDVkZi00YzNjLTk4ZDYtN2IwNDRjMTE5MGRkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbmV4dGdlbSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJmZWM5NDRmNC0wNWRmLTRjM2MtOThkNi03YjA0NGMxMTkwZGQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImZvcnRoLWFkbWluIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.Kf1oAgacq6OlYloibtUETaIMvnZgAG0o6r-eWcyoW7blc03px47cM7o3CvH_dJVYFt6rPwnKQPaarow5gbYXkbWNbce4-QylXzsP8QSDNergWTeOQT3SOSw7gvyNR5tNp2ezQ7mmDzkm4C8ZM0agHEWq-XO-n7p3l8ew-R_WmU3w3os9C9Gv0BPEpjinokh8BQeLf_amPfMF6nvagRfMDal9KMrXCqKadGgNqmEh_KZi3_oDBGwWjZCQVoX3MBsRUy1EVVR-dkacdfxP2JM0VQBC10YGxUckf6E2bvxZsTlxz9zI0vJ_J_HN0z2oQQU6GKT7zPp0pTcTgRm22yJuLA',
    cookie: 'JSESSIONID=E01EE32EA29D9780686F20AFB65983B5; ',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET',
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
  // if (typeof data === 'string') {
  //   data = JSON.parse(data);
  // }
  // if ("topics" in data) delete data.topics;

  if (typeof"dataOwners" === "string")
  data["dataOwners"] = [req.query.dataOwners];
  options.body = JSON.stringify(data);
  options.method = "POST";
  console.log(options.body)
  const resp = await fetch(url, options)
  const respp = await resp.text();
  console.log(resp.status)
  res.send({status: resp.status})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});