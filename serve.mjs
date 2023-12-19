import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

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
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q3R0eXZpUWlkZ052ZVdOZFNzR244ajN1MGlKRG13U0I1S19LS2hVbVNrIn0.eyJleHAiOjE3MDMwMDgwNjIsImlhdCI6MTcwMjk3OTI2MiwianRpIjoiMTU2NmVlMGEtMzk1Zi00N2RlLWFiMTUtZWJiYmY0NjIwYTQ1IiwiaXNzIjoiaHR0cDovLzEzOS45MS41OC4xNjozMDY2OC9yZWFsbXMvTmV4dEdFTSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzMyN2UzMC05MDVmLTQ2MjItOTJjZS02NGY2ZjgxNDJiNTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuaWtoLWF1dGgiLCJzZXNzaW9uX3N0YXRlIjoiZTYxYzMzNWYtMzNjYS00ZGVhLWI2NzctNTM1ZjVhMjdiNThkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbmV4dGdlbSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJlNjFjMzM1Zi0zM2NhLTRkZWEtYjY3Ny01MzVmNWEyN2I1OGQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImZvcnRoLWFkbWluIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.W5cZ1nNITEJEVVP56lZIxAqUX1z6iSbzOU1UfjxUu-O81E-NNLbB79yQqPgkw5p-dTvedoQqexTWsvA_y0_-foSL51q6jv9HNJv74-fbV57me3CekEwwY5LCA5htQedTgd-2XXACfdyAsS3j9KqmlPCV63ODwh4SG9vb0SKh59OzVQZISedfF2t13HlKeV4m7t7gZDVXlrx6VL8HjZ1ZpqrNO0-DVps4ObtdWrp88whPoUBTLNxyEMije_OV74CpSatrry_RWHpCmCwojboD6yLnRMcFBaeTmtSSO44JsG7HWvsEUS0uIqLA6PnjSet49KpE13ZrIYg477POr1n0_g',
    Authorization: 'access_token eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q3R0eXZpUWlkZ052ZVdOZFNzR244ajN1MGlKRG13U0I1S19LS2hVbVNrIn0.eyJleHAiOjE3MDMwMDgwNjIsImlhdCI6MTcwMjk3OTI2MiwianRpIjoiMTU2NmVlMGEtMzk1Zi00N2RlLWFiMTUtZWJiYmY0NjIwYTQ1IiwiaXNzIjoiaHR0cDovLzEzOS45MS41OC4xNjozMDY2OC9yZWFsbXMvTmV4dEdFTSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzMyN2UzMC05MDVmLTQ2MjItOTJjZS02NGY2ZjgxNDJiNTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuaWtoLWF1dGgiLCJzZXNzaW9uX3N0YXRlIjoiZTYxYzMzNWYtMzNjYS00ZGVhLWI2NzctNTM1ZjVhMjdiNThkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbmV4dGdlbSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJlNjFjMzM1Zi0zM2NhLTRkZWEtYjY3Ny01MzVmNWEyN2I1OGQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImZvcnRoLWFkbWluIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.W5cZ1nNITEJEVVP56lZIxAqUX1z6iSbzOU1UfjxUu-O81E-NNLbB79yQqPgkw5p-dTvedoQqexTWsvA_y0_-foSL51q6jv9HNJv74-fbV57me3CekEwwY5LCA5htQedTgd-2XXACfdyAsS3j9KqmlPCV63ODwh4SG9vb0SKh59OzVQZISedfF2t13HlKeV4m7t7gZDVXlrx6VL8HjZ1ZpqrNO0-DVps4ObtdWrp88whPoUBTLNxyEMije_OV74CpSatrry_RWHpCmCwojboD6yLnRMcFBaeTmtSSO44JsG7HWvsEUS0uIqLA6PnjSet49KpE13ZrIYg477POr1n0_g',
    cookie: 'JSESSIONID=E01EE32EA29D9780686F20AFB65983B5; '
  }
}; 

app.use(cors());

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
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

