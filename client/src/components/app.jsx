/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/ClassRelated';
import Reviews from './Reviews/Reviews';
import ProdDetail from './ProdDetail/ProdDetail';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dummy default product ID
      currentProduct: 40344,
      navDisplay: false,
    };
    this.renderNav = this.renderNav.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(id) {
    this.setState({
      currentProduct: id,
    });
  }

  renderNav() {
    const navState = !this.state.navDisplay;
    this.setState({
      navDisplay: navState,
    });
  }

  render() {
    const { currentProduct } = this.state;
    return (
      <main>
        {this.state.navDisplay && <Nav />}
        <div>Hello World</div>
        <button type="button" onClick={this.renderNav}>Nav</button>
       {/*  <ProdDetail id={currentProduct} />
        <RelatedProductsAndOutfit id={currentProduct} changeProduct={this.changeProduct} /> */}
        <Reviews id={currentProduct} />
      </main>
    );
  }
}

export default App;
