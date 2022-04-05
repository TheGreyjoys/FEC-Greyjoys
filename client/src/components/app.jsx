import React from 'react';
import Nav from './Nav';
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
  }

  renderNav() {
    const navState = !this.state.navDisplay;
    this.setState({
      navDisplay: navState,
    });
  }

  render() {
    const { currentProduct } = this.state
    return (
      <main>
        {this.state.navDisplay && <Nav />}
        <div>Hello World</div>
        <button onClick={this.renderNav}>Nav</button>
        <ProdDetail id={currentProduct} />
        <Reviews />
      </main>
    );
  }
}

export default App;
