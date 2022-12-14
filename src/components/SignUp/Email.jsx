import { faCircleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import SignUpForm from './SignUpForm';
import WarnMessage from './WarnMessage';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const Email = ({ page, pageCount, setPage, goNextPage, signUpInfo, setSignUpInfo }) => {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onChangeEmail = useCallback(
    (e) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸습니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    },
    [setEmail],
  );

  const getValidationEmail = () => {
    setIsLoading(true);
    axios
      .post('auth/email-double-check', {
        email,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setSignUpInfo({ ...signUpInfo, email });
          goNextPage();
        }
      })
      .catch((res) => {
        if (res.response.status === 409) {
          setIsLoading(false);
          setEmailMessage('이미 존재하는 이메일입니다.');
        }
      });
  };
  return (
    <SignUpForm page={page} pageCount={pageCount} setPage={setPage}>
      <div className="border-b border-[#D9D9D9] flex pb-1">
        <FontAwesomeIcon icon={faEnvelope} className="text-gray text-2xl pr-3" />
        <input type="text" placeholder="Email ID" onChange={onChangeEmail} value={email} />
      </div>
      <WarnMessage message={emailMessage} />
      <div>
        {isEmail ? (
          isLoading ? (
            <ClipLoader
              className="mt-12 float-right"
              color="#18580C"
              cssOverride={{
                width: '1.875rem',
                height: '1.875rem',
              }}
            />
          ) : (
            <button className="mt-12 float-right" onClick={getValidationEmail}>
              <FontAwesomeIcon icon={faCircleRight} className="text-green-dark text-3xl" />
            </button>
          )
        ) : (
          <button className="mt-12 float-right">
            <FontAwesomeIcon icon={faCircleRight} className="text-gray text-3xl" />
          </button>
        )}
      </div>
    </SignUpForm>
  );
};

export default Email;
