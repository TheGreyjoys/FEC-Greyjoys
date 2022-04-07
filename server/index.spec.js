import regeneratorRuntime from 'regenerator-runtime';

const request = require('supertest');

const app = require('./index');

describe('Forwards HTTP requests to API', () => {
  test('makes an axios.get request', async () => {
    await request(app).get('/products')
      .expect(200);
  });
});
app.close();
