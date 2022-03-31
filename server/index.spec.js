const request = require('supertest');
const app = require('./index');

describe('Forwards HTTP requests to API', () => {
  test('makes an axios.get request', () => {
    request(app).get('/products')
      .then((response) => expect(response.statusCode).toBe('200'));
  });
});
