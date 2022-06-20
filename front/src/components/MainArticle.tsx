import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainAtricles = () => {
  const [articles, setArticles] = useState(new Array());
  useEffect(() => {
    axios
      .get('http://localhost:1000/api/articles/show')
      .then(function (response) {
        setArticles(response?.data.main);
      })
      .catch(function (err) {
        alert(err?.response.data);
      });
  }, []);

  // return articles.map((c, i) => {
  //   console.log(articles);
  //   return <Link to={`/article/${articles[i].id}`} key={articles[i].id}>{`제목: ${articles[i].title}`}</Link>;
  // });

  return (
    <>
      {articles.map((c, i) => {
        return (
          <Link to={`/article/${articles[i].id}`} key={articles[i].id}>
            제목: {articles[i].title}
          </Link>
        );
      })}
    </>
  );
};

export default MainAtricles;
