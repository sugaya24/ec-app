import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

export const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div>
      <h2>Reset Password</h2>
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
      </div>
      <PrimaryButton
        label={'Reset Password'}
        onClick={() => dispatch(resetPassword(email))}
      />
    </div>
  );
};

export default Reset;
