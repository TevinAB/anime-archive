const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

//used to serve the index.html in order to fix error that stems from client side routing and heroku in prod
if (process.env.NODE_ENV === 'production') {
  //regex to catch the homepage '/'
  app.get('^/$', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use('/api', api);

module.exports = app;
