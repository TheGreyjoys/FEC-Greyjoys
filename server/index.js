const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

app.use('/', (req, res, next) => {
  console.log(`${req.method} at ${req.url}`);
  next();
})

app.use(express.static(path.join(__dirname, '../client/dist')));

//a route that will forward all incoming HTTP requests to the API
app.all('*', (req, res, next) => {
  let config = {headers: {authorization: process.env.TOKEN}};
  let method = req.method;
  if (req.method === 'GET' || req.methods === 'PUT') {
    axios.[method](path.join('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/', req.url), config) //method might have to be in brackets
  } else {
    axios.[method](path.join('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/', req.url), req.body, config)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})