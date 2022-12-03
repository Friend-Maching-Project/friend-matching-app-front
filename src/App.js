import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TestPage from './pages/TestPage';
import { silentRefresh } from './redux/modules/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    dispatch(silentRefresh());
  }, []);

  const token = useSelector((s) => s.auth.token);
  return (
    <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="/login" element={token ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
