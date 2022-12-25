import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OAuthSignUpPage from './pages/OAuthSignUpPage';
import RedirectPage from './pages/RedirectPage';
import SignUpPage from './pages/SignUpPage';
import TestPage from './pages/TestPage';
import { silentRefresh } from './redux/modules/auth';

function App() {
  const dispatch = useDispatch();
  const [refreshToken, setRefreshToken] = useState();
  const cookies = new Cookies();
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const refreshCookie = cookies.get('refreshToken');
    if (refreshCookie) {
      dispatch(silentRefresh());
    }
    setRefreshToken(refreshCookie);
  }, []);

  const token = useSelector((s) => s.auth.token);

  return (
    <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <TestPage /> : <Navigate to="/login" />} />
          {/* <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/change-oauth-user-info" element={<OAuthSignUpPage />} />
          <Route path="/oauth/redirect" element={<RedirectPage />} />
          <Route path="/oo" element={<RedirectPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
