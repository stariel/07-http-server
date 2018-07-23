'use strict';

const http = require('http');

const cowsay = require('cowsay');
const parser = require(`${__dirname}/lib/parser.js`);

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

        let queryText = req.url.query.text || 'I need something good to say!';

        let cowsaySpeak = `
        <!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
    <h1> cowsay </h1>
    <pre>
      ${cowsay.say({text: queryText})}
    </pre>
  </body>
</html>`;



        res.write(cowsaySpeak);

        res.end();
        return;
      }

      else if ( req.method === 'POST' && req.url.pathname === '/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        if(req.body.text) {
          let cowMessage = cowsay.say({text: req.body.text});

          res.write(JSON.stringify({content : cowMessage}));
        }

        else {
          res.statusCode = 400;
          res.write(JSON.stringify({error: 'invalid request: text query required'}));
        }
        


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
      res.writeHead(400);
      res.write(JSON.stringify({error: 'invalid request: body required'}));
      console.error(err);
      res.end();
    });

};

const app = http.createServer(requestHandler);

module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};