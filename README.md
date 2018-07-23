[![Build Status](https://travis-ci.com/stariel/07-http-server.svg?branch=master)](https://travis-ci.com/stariel/07-http-server) Lab 07: Vanilla HTTP Server
======

##Cowsay

The application uses the [Cowsay](https://www.npmjs.com/package/cowsay) module.

###### GET /

When a client makes a GET request to / the page displays a link to Cowsay

###### GET /cowsay?text={message}

When a client makes a GET request to /cowsay?text={message} the server parses the querystring for a text key and the cow says the message.

###### POST /api/cowsay
 
When a client makes a POST request to /api/cowsay it should send JSON that includes `{"text": "<message>"}`. The server should respond with a JSON body `{"content": "<cowsay cow>"}`.  

A response for a valid Requests should have a status code of 200 and the JSON body   
``` json 
{
  "content": "<cowsay cow text>" 
}
```

A response for a invalid Requests should have a status code of 400 and the JSON body...
```
{
  "error": "invalid request: text query required"
}
```