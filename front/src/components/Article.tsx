import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Atricles: Function = () => {
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

  return articles.map((c, i) => {
    return <div key={articles[i].id}>{articles[i].title}</div>;
  });
};

export default Atricles;
