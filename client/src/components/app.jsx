/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/classRelated';
import Reviews from './Reviews/Reviews';
import ProdDetail from './ProdDetail/ProdDetail';
import { getCurrentProduct } from '../requests';

function App() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productData, setProductData] = useState(null);
  const [newProduct, setNewProduct] = useState(40346);

  useEffect(() => {
    if (newProduct !== currentProduct) {
      getCurrentProduct(newProduct)
        .then((res) => {
          setCurrentProduct(res.data.id);
          setProductData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [newProduct]);

  const changeProduct = (id) => {
    setNewProduct(id);
  };

  const reviewRef = useRef(null);
  console.log(reviewRef);
  const handleReviewScroll = () => {
    reviewRef.current.scrollIntoView();
  };

  if (productData) {
    return (
      <main>
        <Nav />
        <ProdDetail
          id={currentProduct}
          handleReviewScroll={handleReviewScroll}
        />
        <hr />
        <RelatedProductsAndOutfit
          id={currentProduct}
          changeProduct={changeProduct}
          currentProductData={productData}
        />
        <hr ref={reviewRef} />
        <Reviews
          id={productData.id}
          name={productData.name}
          category={productData.category}
        />
      </main>
    );
  }
  return <div>loading...</div>;
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // dummy default product ID
//       currentProduct: 40346,
//       productData: null,
//     };

//     this.reviewRef = React.createRef();

//     this.changeProduct = this.changeProduct.bind(this);
//     this.handleReviewScroll = this.handleReviewScroll.bind(this);
//   }

//   componentDidMount() {
//     getCurrentProduct(this.state.currentProduct)
//       .then((res) => {
//         this.setState({
//           currentProduct: res.data.id,
//           productData: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//     // this.reviewRef = React.createRef();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.currentProduct !== this.state.currentProduct) {
//       getCurrentProduct(this.state.currentProduct)
//         .then((res) => {
//           this.setState({
//             currentProduct: res.data.id,
//             productData: res.data,
//           });
//         })
//         .catch((err) => console.log(err));
//     }
//     // this.reviewRef = React.createRef();
//   }

//   handleReviewScroll() {
//     this.reviewRef.current.scrollIntoView();
//   }

//   changeProduct(id) {
//     this.setState({
//       currentProduct: id,
//     });
//   }

//   render() {
//     const { currentProduct, productData } = this.state;
//     console.log(this.reviewRef)

//     if (productData) {
//       return (
//         <main>
//           <Nav />
//           <button onClick={this.handleReviewScroll}>Scroll</button>
//           <ProdDetail
//             id={currentProduct}
//             handleReviewScroll={this.handleReviewScroll}
//           />
//           <RelatedProductsAndOutfit
//             id={currentProduct}
//             changeProduct={this.changeProduct}
//             currentProductData={this.state.productData}
//           />
//           <Reviews
//             id={productData.id}
//             name={productData.name}
//             category={productData.category}
//             ref={this.reviewRef}
//           />
//         </main>
//       );
//     }
//     return <div>loading...</div>;
//   }
// }

export default App;
