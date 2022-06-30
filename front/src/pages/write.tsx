import useInput from '../hooks/useInput';
// import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

const Write = () => {
  const [title, setTitle] = useInput('');
  const [contents, setContents] = useInput('');

  const sendArticle = () => {
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://localhost:1000/api/articles/post',
        {
          title: title,
          contents: contents,
        },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then(function (response) {
        window.location.href = '/';
      })
      .catch(function (err) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
      });
  };

  return (
    <>
      <div>
        <p style={{ color: 'blue' }}>Write</p>
        <p>Title</p>
        <Input type="text" id="id" name="id" value={title} onChange={setTitle} />
      </div>
      <div>
        <p>Contents</p>
        <Input type="text" id="id" name="id" value={contents} onChange={setContents} />
      </div>
      <button onClick={sendArticle}>Send</button>
    </>
  );
};

export default Write;
