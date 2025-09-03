import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default Login;