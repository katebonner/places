import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="">
      <div className="container">
        <div >
        {/* <div>
          <Link to="/">
            <h1 class='title'>♥</h1>
          </Link>
        </div> */}
        </div>
        <nav className="container">
          {Auth.loggedIn() ? (
            <>
              <Link to="/" class='container-element'>places</Link>
              <Link to="/profile" class="container-element">me</Link>
              <a href="/" onClick={logout} class="container-element">logout</a>
            </>
          ) : (
            <>
              <Link to="/" class='container-element'>places</Link>
              <Link to="/login" class="container-element">login</Link>
              <Link to="/signup" class="container-element">signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
