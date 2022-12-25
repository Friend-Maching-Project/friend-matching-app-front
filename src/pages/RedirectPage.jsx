import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { oAuthLogin, silentRefresh, getUser } from '../redux/modules/auth';

const RedirectPage = () => {
  const { search } = useLocation();
  const { accessToken } = queryString.parse(search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(oAuthLogin(accessToken));
    dispatch(getUser());
    setTimeout(() => dispatch(silentRefresh()), 1000 * 60 * 50);
  }, []);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo !== '') {
      if (userInfo.birth === null || userInfo.major === null || userInfo.sex === null) {
        navigate('/change-oauth-user-info');
      } else {
        navigate('/');
      }
    }
  }, [userInfo]);
  return <div></div>;
};

export default RedirectPage;
