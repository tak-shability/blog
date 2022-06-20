import React from 'react';
import { Link } from 'react-router-dom';
import Atricles from '../components/Article';

const main = () => {
  return (
    <div>
      <div>
        <h1>Article List</h1>
      </div>
      <div>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div>
        <Link to="/write">
          <button>Write</button>
        </Link>
      </div>
      <Atricles />
    </div>
  );
};
export default main;
