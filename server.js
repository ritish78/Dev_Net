const express = require('express');
const connectMongo = require('./config/db');

const app = express();

//Connect to MongoDB
connectMongo();

//Initializing middleware
app.use(express.json({ extended: false }));


const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;


app.get('/', (req, res) => {
    res.send('API running!');
})


//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));



app.listen(EXPRESS_SERVER_PORT, () => console.log('Server started on port', EXPRESS_SERVER_PORT));