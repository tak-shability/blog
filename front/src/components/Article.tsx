import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Atricles = () => {
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
  return <div>{articles.map((v) => `${v.title}\n`)}</div>;
};

export default Atricles;
