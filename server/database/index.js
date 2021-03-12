const mongoose = require('mongoose');

module.exports = function (connectionUrl) {
  mongoose
    .connect(connectionUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Database connected to: ${connectionUrl}`))
    .catch((error) => console.log(error));
};
