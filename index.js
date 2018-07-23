'use strict';

const dotenv = require('dotenv').config();

const server = require('./src/app.js');

server.start(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));