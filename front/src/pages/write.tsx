import React from 'react';
import axios from 'axios';

const sendArticle = () => {
  console.log('실행됨');
  const title = document.getElementById('title');
  const contents = document.getElementById('contents');

  axios
    .post('http://localhost:1000/api/article/post', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: { title: title, contents: contents },
    })
    .then(function (response) {
      console.log(response);
      window.location.href = '/';
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
};

const write = () => {
  return (
    <div>
      <br />
      <label id="title">
        Title: <textarea id="contents" />
      </label>
      <hr></hr>
      <div></div>
      <textarea id="contents" />
      <button onClick={sendArticle}> Submit </button>
    </div>
  );
};
export default write;
