import React from 'react';
import Layout from '../Layout';

const SignUpForm = ({ children, page, pageCount }) => {
  return (
    <Layout height="h-100">
      <div className="h-full flex items-center flex-col justify-center ">
        <div className="w-full">
          <div className="text-waniGreen font-bold text-4xl mb-12">Register</div>
          {children}
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 translate-x-[-50%]">
        {page + 1} / {pageCount}
      </div>
    </Layout>
  );
};

export default SignUpForm;
