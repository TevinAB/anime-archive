const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
