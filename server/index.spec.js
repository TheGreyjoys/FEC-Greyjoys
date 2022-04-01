const request = require('supertest');
const app = require('./index');

describe('Forwards HTTP requests to API', () => {
  test('makes an axios.get request', (done) => {
    request(app).get('/products')
      .expect(200, done);
  });
});
