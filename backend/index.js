const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./config/db');
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

app.use(express.json());
app.use(cors());
app.use('/auth', authRoute);
app.use('/game', gameRoute);

app.listen(process.env.PORT || 8000, () => {
 console.log('Server started successfully');
});
