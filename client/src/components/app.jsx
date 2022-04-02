import React from 'react';
import Nav from './Nav';
import RelatedProductsAndOutfit from './relatedProducts/relatedProductsAndOutfit';

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
      <div>
        {this.state.navDisplay && <Nav />}
        <div>Hello World</div>
        <button onClick={this.renderNav}>Nav</button>
        <RelatedProductsAndOutfit id={40377} />
      </div>
    );
  }
}

export default App;
