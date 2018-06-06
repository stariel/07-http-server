'use strict';

const http = require('http');

const cowsay = require('cowsay');
const parser = require('.lib/parser.js');

const requestHandler = (req, res) => {

  parser(req)
    .then( req => {

      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        res.end();
        return;
      }

      else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        let message = req.url.query.text;

        res.write(cowsay.say({
          text : message,
          e : 'oo',
          T : 'U',
        }));

        res.end();
        return;
      }

      else if ( req.method === 'POST' && req.url.pathname === '/api/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.write( JSON.stringify(req.body) );
        res.end();
        return;
      }

      else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }

    })
    .catch(err => {
      res.writeHead(500);
      res.write(err);
      res.end();
    });

};

const app = http.createServer(requestHandler);

module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};