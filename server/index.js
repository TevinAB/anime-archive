const app = require('./initializeServer');
const connectDatabase = require('./database');
const connectionUrl = require('config').get('mongoUri');

const PORT = process.env.PORT || 5000;

//Connect to db
connectDatabase(connectionUrl);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
