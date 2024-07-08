const express = require('express');
const cors = require('cors');
const { db } = require('./db'); 
const { readdirSync } = require('fs');
const userRoutes = require('./routes/user');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(express.json());
app.use(cors());



// Dynamically load routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));
app.use('/api/v1/user', userRoutes);

// Server setup
const server = () => {
    db(); 
    app.listen(PORT, () => {
        console.log('Listening to Port:', PORT);
    });
};

server();
