import React, { useState } from 'react';
import { render } from 'react-dom';

function Nav() {
  const [searchBar, setSearchBar] = useState('');

  const handleChange = (e) => {
    setSearchBar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchBar('');
  };

  return (
    <nav>
      <img className="logo" src="https://i.ibb.co/Kwd1XJ3/kraken.png" alt="release it" style={{ width: '60px' }} />
      <h1>Kraken FEC</h1>
      <form
        className="nav-search"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchBar}
          onChange={handleChange}
        />
        <button
          type="submit" className="search-button"
        />
      </form>
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
