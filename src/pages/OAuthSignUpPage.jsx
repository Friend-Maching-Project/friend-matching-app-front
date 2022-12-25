import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Birth from '../components/SignUp/Birth';
import Major from '../components/SignUp/Major';
import Nickname from '../components/SignUp/Nickname';
import Sex from '../components/SignUp/Sex';

const OAuthSignUpPage = () => {
  const navigate = useNavigate();
  const pageCount = 4;
  const [page, setPage] = useState(0);
  const [signUpInfo, setSignUpInfo] = useState({
    nickname: '',
    sex: 'male',
    birth: '',
    major: '',
  });

  const goNextPage = () => {
    setPage(page + 1);
  };
  const goPreviousPage = () => {
    setPage(page - 1);
  };
  const signUp = async ({ nickname, sex, birth, major }) => {
    try {
      const response = await axios.post('/user/change-oauth-user-info', {
        nickname,
        sex,
        birth,
        major,
      });
      return response.status;
    } catch (err) {
      return err.response.status;
    }
  };
  const pages = [
    <Nickname
      page={page}
      pageCount={pageCount}
      setPage={setPage}
      goPreviousPage={goPreviousPage}
      goNextPage={goNextPage}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
    />,
    <Sex
      page={page}
      pageCount={pageCount}
      setPage={setPage}
      goPreviousPage={goPreviousPage}
      goNextPage={goNextPage}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
    />,
    <Birth
      page={page}
      pageCount={pageCount}
      setPage={setPage}
      goPreviousPage={goPreviousPage}
      goNextPage={goNextPage}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
    />,
    <Major
      page={page}
      pageCount={pageCount}
      setPage={setPage}
      goPreviousPage={goPreviousPage}
      goNextPage={goNextPage}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
      signUp={signUp}
    />,
  ];
  return <>{pages[page]}</>;
};

export default OAuthSignUpPage;
