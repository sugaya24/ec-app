import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { signIn } from '../reducks/users/operations';
import { push } from 'connected-react-router';

export const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <TextInput
          fullWidth={true}
          label={'Email'}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={'email'}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={'Password'}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={'password'}
          onChange={inputPassword}
        />
      </div>
      <PrimaryButton
        label={'Sign in'}
        onClick={() => dispatch(signIn(email, password))}
      />
      <p onClick={() => dispatch(push('/signup'))}>Sing Up</p>
      <p onClick={() => dispatch(push('/signin/reset'))}>Forgot password?</p>
    </div>
  );
};

export default SignIn;
