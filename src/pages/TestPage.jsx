import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/modules/auth';

const TestPage = () => {
  const dispatch = useDispatch();
  const t = () => {
    dispatch(getUser());
  };
  return (
    <div>
      <button onClick={t}>눌러~</button>
    </div>
  );
};

export default TestPage;
