import React from 'react';

function ImageCarousel(props) {
  const {
    allImgs, currIndex, prevImg, nextImg,
  } = props;

  return (
    <div className="carousel">
      <button
        type="button"
        className="left-arrow"
        onClick={prevImg}
      >
        &larr;
      </button>
      <div
        className="image-slide"
        style={{
          backgroundImage: `url(${allImgs[currIndex]})`,
        }}
      />
      <button
        type="button"
        className="right-arrow"
        onClick={nextImg}
      >
        &rarr;
      </button>
    </div>
  );
}

// class ImageCarousel extends React.Component {
//   constructor(props) {
//     super(props);

//     const { allImgs, currIndex } = this.props;

//     this.state = {
//       allImgs,
//       currIndex,
//     };
//   }

//   componentDidUpdate(prevProps) {
//     const oldIndex = prevProps.currIndex;
//     const { currIndex } = this.props;
//     if (oldIndex !== currIndex) {
//       this.setState({
//         currIndex,
//       });
//     }
//   }

//   render() {
//     const { allImgs, currIndex } = this.state;
//     const { prevImg, nextImg } = this.props;
//     return (
//       <div className="carousel">
//         <button
//           type="button"
//           className="left-arrow"
//           onClick={prevImg}
//         >
//           &larr;
//         </button>
//         <div
//           className="image-slide"
//           style={{
//             backgroundImage: `url(${allImgs[currIndex]})`,
//           }}
//         />
//         <button
//           type="button"
//           className="right-arrow"
//           onClick={nextImg}
//         >
//           &rarr;
//         </button>
//       </div>
//     );
//   }
// }

export default ImageCarousel;
