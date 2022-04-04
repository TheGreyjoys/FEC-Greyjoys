import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/classRelated';
import ProdDetail from './ProdDetail/ProdDetail';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navDisplay: false,
    };
    this.renderNav = this.renderNav.bind(this);
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
        <RelatedProductsAndOutfit id={40377} />
      </main>
    );
  }
}

export default App;
