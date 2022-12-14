import { faCircleLeft, faCircleRight, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import SignUpForm from './SignUpForm';
import WarnMessage from './WarnMessage';

const Nickname = ({
  page,
  pageCount,
  setPage,
  goPreviousPage,
  goNextPage,
  signUpInfo,
  setSignUpInfo,
}) => {
  const [nickname, setNickname] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNickname, setIsNickname] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeNickname = useCallback((e) => {
    const nicknameRegex = /^[ㄱ-ㅎ|가-힣]+$/;
    const nicknameCurrent = e.target.value;
    setNickname(nicknameCurrent);

    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMessage('닉네임은 한글만 가능합니다.');
      setIsNickname(false);
    } else if (nicknameCurrent.length < 2 || nicknameCurrent.length > 10) {
      setNicknameMessage('닉네임은 2글자 이상 10글자 이하입니다.');
      setIsNickname(false);
    } else {
      setNicknameMessage('');
      setIsNickname(true);
    }
  }, []);

  const getValidationNickname = () => {
    setIsLoading(true);
    axios
      .get('/auth/nickname-double-check', { params: { nickname } })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setSignUpInfo({ ...signUpInfo, nickname });
          goNextPage();
        }
      })
      .catch((res) => {
        if (res.response.status === 409) {
          setIsLoading(false);
          setNicknameMessage('이미 존재하는 닉네임입니다.');
        }
      });
  };
  return (
    <SignUpForm page={page} pageCount={pageCount} setPage={setPage}>
      <div className="border-b border-[#D9D9D9] flex pb-1">
        <FontAwesomeIcon icon={faUserLarge} className="text-gray text-2xl pr-3" />
        <input type="text" placeholder="Nickname" onChange={onChangeNickname} value={nickname} />
      </div>
      <WarnMessage message={nicknameMessage} />
      <div>
        <button className="mt-12 float-left" onClick={goPreviousPage}>
          <FontAwesomeIcon icon={faCircleLeft} className="text-green-dark text-3xl" />
        </button>

        {isNickname ? (
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
            <button className="mt-12 float-right" onClick={getValidationNickname}>
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

export default Nickname;
