import React from 'react';
import AuthTemplate from './auth/AuthTemplate';
import RegisterForm from '../contatiners/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
