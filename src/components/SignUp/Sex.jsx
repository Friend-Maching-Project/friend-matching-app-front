import { faCircleDot, faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot as faRegularCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import { useCallback } from 'react';

const Sex = ({
  page,
  pageCount,
  setPage,
  goPreviousPage,
  goNextPage,
  signUpInfo,
  setSignUpInfo,
}) => {
  const [sex, setSex] = useState('male');
  const onChangeSex = useCallback((e) => {
    setSex(e.target.value);
  }, []);

  const getValidationSex = () => {
    if (sex === 'male' || sex === 'female') {
      setSignUpInfo({ ...signUpInfo, sex });
      goNextPage();
    }
  };
  return (
    <SignUpForm page={page} pageCount={pageCount} setPage={setPage}>
      <div className="flex justify-around">
        <label>
          <input type="radio" name="sex" value="male" className="hidden" onChange={onChangeSex} />
          {sex === 'male' ? (
            <FontAwesomeIcon icon={faCircleDot} className="text-green-dark" />
          ) : (
            <FontAwesomeIcon icon={faRegularCircleDot} className="text-waniGray" />
          )}
          <span
            className={`pl-4 font-bold text-xl ${
              sex === 'male' ? 'text-green-dark' : 'text-waniGray'
            }`}
          >
            Male
          </span>
        </label>
        <label>
          <input type="radio" name="sex" value="female" className="hidden" onChange={onChangeSex} />
          {sex === 'female' ? (
            <FontAwesomeIcon icon={faCircleDot} className="text-green-dark" />
          ) : (
            <FontAwesomeIcon icon={faRegularCircleDot} className="text-waniGray" />
          )}
          <span
            className={`pl-4 font-bold text-xl ${
              sex === 'female' ? 'text-green-dark' : 'text-waniGray'
            }`}
          >
            Female
          </span>
        </label>
      </div>
      <div>
        <button className="mt-12 float-left" onClick={goPreviousPage}>
          <FontAwesomeIcon icon={faCircleLeft} className="text-green-dark text-3xl" />
        </button>
        <button className="mt-12 float-right" onClick={getValidationSex}>
          <FontAwesomeIcon icon={faCircleRight} className="text-green-dark text-3xl" />
        </button>
      </div>
    </SignUpForm>
  );
};

export default Sex;
