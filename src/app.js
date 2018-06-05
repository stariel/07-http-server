'use strict';

const http = require('http');

const cowsay = require('cowsay');
const parser = require('.lib/parser.js');

parser(req)
  .then( req => {

    if (req.method === 'GET' && req.url.pathname === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 200;
      res.statusMessage = 'OK';

      let message = req.url.query.say;

      res.write(cowsay.say({
        text : message,
        e : 'oo',
        T : 'U'
      }));

      res.end();
      return;
    }

  });