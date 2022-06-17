import React from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../components/Article';

const main = () => {
  return (
    <div>
      <div>
        <h1>Article List</h1>
      </div>
      <div>
        <Link to="/write">
          <button>New Post</button>
        </Link>
      </div>
      <ArticleList />
    </div>
  );
};
export default main;
