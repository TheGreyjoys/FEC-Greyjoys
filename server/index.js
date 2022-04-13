/* eslint-disable no-console */
const configJS = require('./config')
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

// a route that will forward all incoming HTTP requests to the API
app.all('*', (req, res) => {
  const config = { headers: { authorization: configJS.TOKEN } };
  const { method, url, body } = req;
  // const target = path.join('http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp', url);
  if (method === 'GET') {
    // console.log(target);
    axios.get(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${url}`, config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => res.send(err));
  } else if (method === 'PUT') {
    console.log('put request sent !!!!!!!', url);
    axios.put(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${url}`, {}, config)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    axios.post(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${url}`, body, config)
      .then((response) => {
        console.log('response: ', response.data);
        res.send(response);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
