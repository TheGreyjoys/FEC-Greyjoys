import React from 'react';
import Nav from './Nav';
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
        <button onClick={this.renderNav}>Nav</button>
        <ProdDetail />
      </main>
    );
  }
}

export default App;
