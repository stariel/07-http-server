'use strict';

const server = require('./src/app.js');

server.start(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`));