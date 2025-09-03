import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <SignupForm />
    </div>
  );
};

export default Signup;