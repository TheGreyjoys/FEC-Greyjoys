/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/classRelated';
import Reviews from './Reviews/Reviews';
import ProdDetail from './ProdDetail/ProdDetail';
import { getCurrentProduct } from '../requests';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dummy default product ID
      currentProduct: 40346,
      navDisplay: false,
      productData: null,
    };
    this.renderNav = this.renderNav.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    // this.sampleData = {
    //   id: 40349,
    //   campus: 'hr-rfp',
    //   name: 'Pumped Up Kicks',
    //   slogan: 'Faster than a just about anything',
    //   description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
    //   category: 'Kicks',
    //   default_price: '89.00',
    //   created_at: '2021-08-13T14:38:44.509Z',
    //   updated_at: '2021-08-13T14:38:44.509Z',
    //   features: [
    //     {
    //       feature: 'Sole',
    //       value: 'Rubber',
    //     },
    //     {
    //       feature: 'Material',
    //       value: 'FullControlSkin',
    //     },
    //     {
    //       feature: 'Mid-Sole',
    //       value: 'ControlSupport Arch Bridge',
    //     },
    //     {
    //       feature: 'Stitching',
    //       value: 'Double Stitch',
    //     },
    //   ],
    // };
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

    if (productData) {
      return (
        <main>
          <Nav />
          <ProdDetail id={currentProduct} />
          <RelatedProductsAndOutfit
            id={currentProduct}
            changeProduct={this.changeProduct}
            currentProductData={this.state.productData}
          />
          <Reviews id={productData.id} name={productData.name} category={productData.category}/>
        </main>
      );
    }
    return <div>loading...</div>;
  }
}

export default App;
