import { faCircleCheck, faCircleLeft, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SignUpForm from './SignUpForm';
import WarnMessage from './WarnMessage';

const Major = ({ page, pageCount, setPage, goPreviousPage, signUpInfo, setSignUpInfo, signUp }) => {
  const navigate = useNavigate();
  const [major, setMajor] = useState('');
  const [majorMessage, setMajorMessage] = useState('');
  const [isMajor, setIsMajor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleMajor = (e) => {
    setMajor(e.target.value);
    if (major !== '' || major !== '전공') {
      setSignUpInfo({ ...signUpInfo, major: e.target.value });
      setMajorMessage('');
      setIsMajor(true);
    } else {
      setMajorMessage('전공을 선택해주세요.');
    }
  };
  const getValidationMajor = async () => {
    if (major === '' || major === '전공') {
      setMajorMessage('전공을 선택해주세요.');
      setIsMajor(false);
    } else {
      setIsLoading(true);
      const res = await signUp(signUpInfo);
      if (res === 200) {
        setIsLoading(false);
        if (pageCount === 4) {
          alert('회원정보 변경에 성공했습니다.');
          navigate('/');
        } else {
          alert('회원가입에 성공했습니다.');
          navigate('/login');
        }
      } else {
        setIsLoading(false);
        if (pageCount === 4) {
          alert('회원정보 변경에 실패했습니다.');
        } else {
          alert('회원가입에 실패했습니다.');
          navigate('/signup');
        }
      }
    }
  };
  return (
    <SignUpForm page={page} pageCount={pageCount} setPage={setPage}>
      <div className="border-b border-[#D9D9D9] flex pb-1">
        <FontAwesomeIcon icon={faGraduationCap} className="text-gray text-2xl pr-3" />
        <select className="w-full" onChange={handleMajor} value={major}>
          {/* TODO 전공 추가하기 */}
          <option>전공</option>
          <optgroup label="IT대학">
            <option>컴퓨터공학과</option>
            <option>전기전자공학과</option>
          </optgroup>
        </select>
      </div>
      <WarnMessage message={majorMessage} />
      <div>
        <button className="mt-12 float-left" onClick={goPreviousPage}>
          <FontAwesomeIcon icon={faCircleLeft} className="text-green-dark text-3xl" />
        </button>
        {isMajor ? (
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
            <button className="mt-12 float-right" onClick={getValidationMajor}>
              <FontAwesomeIcon icon={faCircleCheck} className="text-green-dark text-3xl" />
            </button>
          )
        ) : (
          <button className="mt-12 float-right">
            <FontAwesomeIcon icon={faCircleCheck} className="text-gray text-3xl" />
          </button>
        )}
      </div>
    </SignUpForm>
  );
};

export default Major;
