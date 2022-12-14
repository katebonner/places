import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
    <p class='home-text'>[ my personal arsenal of groovy places in nyc ]</p>
    <main class='container center-container-elements'>
        <div className="card">
          <h4 className="card-header">login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-login-input"
                placeholder="your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-login-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn-login" type="submit">
                submit
              </button>
            </form>

            {error && <div>login failed</div>}
          </div>
      </div>
    </main>
    </>
  );
};

export default Login;
