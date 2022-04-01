import React, { useState } from 'react';
import { render } from 'react-dom';

function Nav() {
  const [searchBar, setSearchBar] = useState('');

  const handleChange = (e) => {
    setSearchBar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    render(<h1>{searchBar}</h1>, document.getElementById('lilRoot'));
    setSearchBar('');
  };

  return (
    <nav>
      <img className="logo" src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="something" style={{ width: '50px' }} />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." value={searchBar} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <div id="lilRoot" />
    </nav>
  );
}

// class Nav extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       searchBar: '',
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e) {
//     this.setState({
//       searchBar: e.target.value,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     alert(`Searching for ${this.state.searchBar}`);
//     this.setState({
//       searchBar: '',
//     });
//   }

//   render() {
//     const { searchBar } = this.state;
//     return (

//     );
//   }
// }

export default Nav;
