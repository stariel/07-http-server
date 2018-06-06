'use strict';

const http = require('http');

const cowsay = require('cowsay');
const parser = require(`${__dirname}/lib/parser.js`);
const fs = require('fs');

const requestHandler = (req, res) => {

  parser(req)
    .then( req => {

      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        let cowsay = `
        <!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
   <header>
     <nav>
       <ul> 
         <li><a href="/cowsay">cowsay</a></li>
       </ul>
     </nav>
   </header>
   <main>
     <!-- project description -->
   </main>
  </body>
</html>
        `;

        res.write(cowsay);

        res.end();
        return;
      }

      else if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        let cowsaySpeak = `
        <!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
    <h1> cowsay </h1>
    <pre>
      ${cowsay.say({text: req.url.query.text})}
    </pre>
  </body>
</html>`;

        res.write(cowsaySpeak);

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