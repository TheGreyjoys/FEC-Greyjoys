import jest from 'jest';


describe('Forwards HTTP requests to API', () => {
  it('makes an axios.get request', () => {
    let data;
    axios.get('/products')
      .then((res) => {
        data = res;
      })
      .catch((err) => console.log(err));
    expect(data).toBeDefined();
  });
});
