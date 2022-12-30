import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
const FilterModal = ({
  filterModalIsOpen,
  setFilterModalIsOpen,
  places,
  setPlaces,
  sex,
  setSex,
}) => {
  const [tempPlaces, setTempPlaces] = useState(places);
  const [tempSex, setTempSex] = useState(sex);
  const onPlaces = (e) => {
    const text = e.target.innerText;
    if (tempPlaces.includes(text)) {
      setTempPlaces(tempPlaces.filter((place) => place !== text));
    } else {
      setTempPlaces([...tempPlaces, text]);
    }
  };
  const onSex = (e) => {
    const text = e.target.innerText;
    const textEng = text === '남자' ? 'male' : 'female';
    if (tempSex.includes(textEng)) {
      setTempSex(tempSex.filter((item) => item !== textEng));
    } else {
      setTempSex([...tempSex, textEng]);
    }
  };

  const onSearch = () => {
    setPlaces(tempPlaces);
    setSex(tempSex);
    setFilterModalIsOpen(false);
  };

  useEffect(() => {
    setTempPlaces(places);
    setTempSex(sex);
  }, [filterModalIsOpen]);

  return (
    <Modal
      isOpen={filterModalIsOpen}
      onRequestClose={() => setFilterModalIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: 'rgb(153, 153, 153, 0.75)',
        },
        content: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '6rem',
          border: '0px',
          borderRadius: '0px',
          padding: '0px',
          maxWidth: '425px',
        },
      }}
    >
      <div className="flex justify-center items-center relative border-b border-[#f0f0f0] w-full h-16">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-4xl absolute left-3"
          onClick={() => setFilterModalIsOpen(false)}
        />
        <div className="text-2xl">필터</div>
      </div>
      <div>
        <div>
          <div className="text-xl py-4 border-b border-[#f2f2f2] px-4">장소</div>
          <div className="bg-[#f9f9f9] px-4">
            <div className="flex w-full py-2">
              <div className={`w-1/2 ${tempPlaces.includes('백록관') && 'text-[#00be70]'}`}>
                <span onClick={onPlaces}> 백록관</span>
              </div>
              <div className={`w-1/2 ${tempPlaces.includes('천지관') && 'text-[#00be70]'}`}>
                <span onClick={onPlaces}> 천지관</span>
              </div>
            </div>
            <div className="flex w-full border-b border-[#f2f2f2] py-2">
              <div className={`w-1/2 ${tempPlaces.includes('두리관') && 'text-[#00be70]'}`}>
                <span onClick={onPlaces}> 두리관</span>
              </div>
              <div className={`w-1/2 ${tempPlaces.includes('석재') && 'text-[#00be70]'}`}>
                <span onClick={onPlaces}> 석재</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xl py-4 border-b border-[#f2f2f2] px-4">성별</div>
          <div className="bg-[#f9f9f9] px-4 border-b border-[#f2f2f2]">
            <div className="flex w-full py-2">
              <div className={`w-1/2 ${tempSex.includes('male') && 'text-[#00be70]'}`}>
                <span onClick={onSex}>남자</span>
              </div>
              <div className={`w-1/2 ${tempSex.includes('female') && 'text-[#00be70]'}`}>
                <span onClick={onSex}> 여자</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#4cd963] text-[#fff] absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center"
        onClick={onSearch}
      >
        검색
      </div>
    </Modal>
  );
};

export default FilterModal;
