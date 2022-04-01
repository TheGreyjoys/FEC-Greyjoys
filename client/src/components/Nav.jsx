import React from 'react';

function Nav(props) {
  return (
    <nav>
      <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="something" style={{ width: '50px' }} />
      <input type="" placeholder="Search..." />
      <button type="submit" onClick={() => { console.log(props); }}>Search</button>
    </nav>
  );
}

export default Nav;
