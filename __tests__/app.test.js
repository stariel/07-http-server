'use strict';

const superagent = require('superagent');
const app = require('../src/app.js');

describe('Simple Web Server', () => {

  beforeAll( () => {
    app.start(3000);
  });

  afterAll( () => {
    app.stop();
  });

  it('handles an invalid get request with a 404', () => {

    return superagent.get('http://localhost:3000/cat')
      .then(response => console.log(response))
      .catch(response => expect(response.status).toEqual(404));

  });

  it('handles a valid get request', () => {

    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('body'));
      })
      .catch(console.err);

  });

  it('handles a get request with a query string', () => {

    return superagent.get('http://localhost:3000/?text=hello')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);

  });

});