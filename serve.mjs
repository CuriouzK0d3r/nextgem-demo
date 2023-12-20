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
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q3R0eXZpUWlkZ052ZVdOZFNzR244ajN1MGlKRG13U0I1S19LS2hVbVNrIn0.eyJleHAiOjE3MDMwOTE5MTAsImlhdCI6MTcwMzA2MzExMCwianRpIjoiYmE1OTM4MDAtMWI4NC00ZGVmLThhYzctMjcwNmMyZmYxNGY1IiwiaXNzIjoiaHR0cDovLzEzOS45MS41OC4xNjozMDY2OC9yZWFsbXMvTmV4dEdFTSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzMyN2UzMC05MDVmLTQ2MjItOTJjZS02NGY2ZjgxNDJiNTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuaWtoLWF1dGgiLCJzZXNzaW9uX3N0YXRlIjoiYzI1NjlkMTEtOGI3MS00MGY1LTlhYzMtYjQ3YjQxZDgyMzlmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbmV4dGdlbSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJjMjU2OWQxMS04YjcxLTQwZjUtOWFjMy1iNDdiNDFkODIzOWYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImZvcnRoLWFkbWluIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.ZDj6DkFVOLBkZM9QphEIkWCWdvH9-QelJI8o6q8Y7_gg4nB6cTEq7V_NQKkTFNUPAHGaWArEbo4rLuryM7pl3M5rxjIvxEnGXLwQCzVcl13eI4-7V8QXlKt1vkaWl2vEAPn9oLxlc9OpRFT4B71Z0tc-Ft1Weq5Z-p2VZV2hmJyp0vv1OI_kb-DjCEOE5dJpeFYvAp2JUT7s1zvOmNWzLQiuCqwimGPf6wdNCHfIneXN845BCYatSn8_tI4o5N8cXDc5JcT0xRBxy_wMmoBq1ul_xiYv4ech5VVbrZfbgCGFRq9QhrV2hsgeZVTFCpot1jvibVUVcwQdBhsNH8tadg',
    cookie: 'JSESSIONID=E01EE32EA29D9780686F20AFB65983B5; ',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Q3R0eXZpUWlkZ052ZVdOZFNzR244ajN1MGlKRG13U0I1S19LS2hVbVNrIn0.eyJleHAiOjE3MDMwOTEwODksImlhdCI6MTcwMzA2MjI4OSwianRpIjoiOGE5OGEzZjYtY2M0My00ZDFkLWEyODItZGY2OGM1OGE0NTFlIiwiaXNzIjoiaHR0cDovLzEzOS45MS41OC4xNjozMDY2OC9yZWFsbXMvTmV4dEdFTSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5NzMyN2UzMC05MDVmLTQ2MjItOTJjZS02NGY2ZjgxNDJiNTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJuaWtoLWF1dGgiLCJzZXNzaW9uX3N0YXRlIjoiMjg0NmI0YWQtZjliYy00OTgyLTg2NGMtNjkwOWU4NjRhNzI3IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtbmV4dGdlbSIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiIyODQ2YjRhZC1mOWJjLTQ5ODItODY0Yy02OTA5ZTg2NGE3MjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImZvcnRoLWFkbWluIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.QoZOe89Rc5Zw7OCxjPClHek1hr5TO0ARN5pk9SGkmCAbzmoFvHVj_mh6jXFrbXnlvSJDFiX3rpKWPUtTRmTZcIbyojxdbrmBfL_Z_GsBFVUpA4OTnqG5TLuGpsOmcPjnSxFogC884OMvW90DoRhMeR-Ja2OKggWbs82D1GysvfULHYghpCAi1sfL9hmVK9aWVkjYbQhedgTFGdDt613aZa5cyIk4dHiXeWG9lb7QKPiCJxM4_ubXr0gtdPef1HPBF8iYmrZKuCrV4j3HmoBi9F68LlJhXEeqbB1bGVQRw52jvGCkn8u26HzS8msFSYT9QSOTJxdi-Kcxi8U1w8C7Fg",
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
  data["dataOwners"] = [req.query.dataOwners];
  options.body = JSON.stringify(data);
  options.method = "POST";

  const resp = await fetch(url, options)
  const respp = await resp.text();

  res.send({status: resp.status})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});