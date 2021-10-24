import React from 'react';
import AuthTemplate from './auth/AuthTemplate';
import LoginForm from '../contatiners/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
