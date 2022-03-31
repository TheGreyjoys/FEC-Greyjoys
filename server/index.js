/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const axios = require('axios');

const port = process.env.PORT || 3000;
require('dotenv').config();

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));

// a route that will forward all incoming HTTP requests to the API
app.all('*', (req, res, next) => {
  const config = { headers: { authorization: process.env.TOKEN } };
  const { method } = req;
  if (method === 'GET') {
    axios.get(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => res.send(err));
  } else if (method === 'PUT') {
    axios.put(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, config)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.send(err));
  } else {
    axios.post(`http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, req.body, config)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => res.send(err));
  }
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
