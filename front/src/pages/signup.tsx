import useInput from '../hooks/useInput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

const Signup = () => {
  const [userID, setUserID] = useInput('');
  const [password, setPassword] = useInput('');

  const sendSignup = () => {
    axios
      .post('http://localhost:1000/api/users/signup', {
        userID: userID,
        password: password,
      })
      .then(function (response) {
        window.location.href = '/login';
      })
      .catch(function (err) {
        console.log(err.response.data);
        alert(err.response);
      });
  };

  return (
    <>
      <div>
        <p style={{ color: 'blue' }}>Signup</p>
        <p>ID</p>
        <Input type="text" id="id" name="id" value={userID} onChange={setUserID} />
      </div>
      <div>
        <p>password</p>
        <Input type="text" id="id" name="id" value={password} onChange={setPassword} />
      </div>
      <button onClick={sendSignup}>Send</button>
    </>
  );
};

export default Signup;
