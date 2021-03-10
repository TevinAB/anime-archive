const app = require('./initializeServer');
const PORT = process.env.PORT || 5000;

//Connect to db

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
