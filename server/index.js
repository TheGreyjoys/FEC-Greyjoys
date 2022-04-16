/* eslint-disable no-console */
const configJS = require('./config');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const spdy = require('spdy');
const configJS = require('./config');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const TOKEN = configJS.TOKEN || process.env.TOKEN;
const options = {
  key: fs.readFileSync(path.join(__dirname, '../key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../cert.pem')),
};

app.use(express.json());

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(expressStaticGzip(path.join(__dirname, '../client/dist')));

// a route that will forward all incoming HTTP requests to the API
app.all('*', (req, res) => {
  const config = { headers: { authorization: TOKEN } };
  const { method, url, body } = req;
  const apiPath = `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${url}`;
  if (method === 'GET') {
    axios.get(apiPath, config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => res.send(err));
  } else if (method === 'PUT') {
    console.log('put request sent !!!!!!!', url);
    axios.put(apiPath, {}, config)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    axios.post(apiPath, body, config)
      .then((response) => {
        console.log('response: ', response.data);
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

// spdy.createServer(
//   options,
//   app,
// ).listen(port, () => {
//   console.log(`Super cool app listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
