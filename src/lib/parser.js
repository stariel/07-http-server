'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = (req) => {
  return new Promise ( (resolve, reject) =>{
    if(!(req || req.url)) {
      reject('Request invalid, can not parse.');
    }

    req.url = url.parse(req.url);

    req.url.query = queryString.parse(req.url.query);
  } );
};