import useInput from '../hooks/useInput';
// import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

const Login = () => {
  const [userID, setUserID] = useInput('');
  const [password, setPassword] = useInput('');

  const sendLogin = () => {
    axios
      .post(
        'http://localhost:1000/api/users/login',
        {
          userID: userID,
          password: password,
        },
        { withCredentials: true },
      )
      .then(function (response) {
        window.location.href = '/';
      })
      .catch(function (err) {
        console.log(err.response.data);
        alert(err.response);
      });
  };

  return (
    <>
      <div>
        <p style={{ color: 'blue' }}>Login</p>
        <p>ID</p>
        <Input type="text" id="id" name="id" value={userID} onChange={setUserID} />
      </div>
      <div>
        <p>password</p>
        <Input type="text" id="id" name="id" value={password} onChange={setPassword} />
      </div>
      <button onClick={sendLogin}>Send</button>
    </>
  );
};

export default Login;
