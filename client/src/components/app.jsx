/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/ClassRelated';
import Reviews from './Reviews/Reviews';
import ProdDetail from './ProdDetail/ProdDetail';
import { getCurrentProduct } from '../requests';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dummy default product ID
      currentProduct: 40344,
      navDisplay: false,
      productData: null,
    };
    this.renderNav = this.renderNav.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  componentDidMount() {
    getCurrentProduct(this.state.currentProduct)
      .then((res) => {
        this.setState({
          currentProduct: res.data.id,
          productData: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentProduct !== this.state.currentProduct) {
      getCurrentProduct(this.state.currentProduct)
        .then((res) => {
          this.setState({
            currentProduct: res.data.id,
            productData: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
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
    const { currentProduct, productData } = this.state;
    if(productData) {
      return (
        <main>
          <Nav />
          <ProdDetail id={currentProduct} />
          <RelatedProductsAndOutfit
            id={currentProduct}
            changeProduct={this.changeProduct}
            currentProductData={this.state.productData}
          />
          <Reviews id={productData.id} name={productData.name}/>
        </main>
      );
    } else {
      return <div>loading...</div>
    }

  }
}

export default App;
