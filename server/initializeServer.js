const express = require('express');
const app = express();
const api = require('./routes');

app.use(express.json());
app.use('/api', api);

module.exports = app;
