import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/classRelated';
import Reviews from './Reviews/Reviews';
import ProdDetail from './ProdDetail/ProdDetail';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDisplay: false,
      currentProduct: 40346,
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
    return (
      <main>
        {this.state.navDisplay && <Nav />}
        <div>Hello World</div>
        <button type="button" onClick={this.renderNav}>Nav</button>
        <ProdDetail />
        <RelatedProductsAndOutfit
          id={this.state.currentProduct}
          changeProduct={this.changeProduct}
        />
        <Reviews />
      </main>
    );
  }
}

export default App;
