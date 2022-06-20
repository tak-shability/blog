import React from 'react';
import { Link } from 'react-router-dom';
import MainAtricles from '../components/MainArticle';

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
      <MainAtricles />
    </div>
  );
};
export default main;
