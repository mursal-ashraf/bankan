import { useLogin } from '@/hooks';
import React from 'react';
import AuthDialog from '../common/AuthDialog';
import { Routes } from '@/Router/AppRouter';
import ComponentContainer from '../common/ComponentContainer';

const InnerLogin: React.FC = () => {
  const [login, { isLoading, error }] = useLogin();

  return (
    <AuthDialog
      title="Login"
      submitText="Login"
      submitRoute={Routes.Dashboard}
      alternateText="Sign up instead"
      alternateRoute={Routes.Signup}
      finishHandler={login}
      isLoading={isLoading}
      error={error}
    />
  );
};

export const Login: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerLogin />
    </ComponentContainer>
  );
};
