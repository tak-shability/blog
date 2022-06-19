import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Atricles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:1000/api/articles/show')
      .then(function (response) {
        console.log('response === ', response);
        setArticles(response?.data.main);
        console.log('댕댕한바퀴~');
      })
      .catch(function (err) {
        console.log(err.response.data);
        alert(err.response.data);
        console.log('댕댕한바퀴~ 에러~');
      });
  }, []);

  console.log(articles ? `잘됨 ${JSON.stringify(articles)}` : '안됨');
  return <div>{articles ? articles : '안됨'}</div>;
};

export default Atricles;
