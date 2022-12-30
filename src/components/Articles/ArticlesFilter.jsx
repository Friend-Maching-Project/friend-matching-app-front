import {
  faArrowUpWideShort,
  faArrowDownWideShort,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useEffect } from 'react';
import FilterModal from './FilterModal';
import { ASC, DESC } from '../../constants';

const ArticlesFilter = ({
  places,
  setPlaces,
  sex,
  setSex,
  filterModalIsOpen,
  setFilterModalIsOpen,
  onReset,
  sort,
  setSort,
}) => {
  useEffect(() => {
    if (filterModalIsOpen) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [filterModalIsOpen]);

  const onSort = () => {
    if (sort === DESC) {
      setSort(ASC);
    } else {
      setSort(DESC);
    }
  };
  return (
    <div className="flex justify-between bg-[#ffffff] rounded-lg fixed left-0 right-0 top-article-filter h-12 mx-4 px-2">
      <FilterModal
        filterModalIsOpen={filterModalIsOpen}
        setFilterModalIsOpen={setFilterModalIsOpen}
        sex={sex}
        setSex={setSex}
        places={places}
        setPlaces={setPlaces}
      />

      <div className="flex items-center">
        <div className=" flex">
          <button
            onClick={() => setFilterModalIsOpen(true)}
            className={`border-2 rounded-3xl  pl-3 pr-2 mr-2 border-[#eeeeee] py-1 flex items-center w-full ${
              places.length !== 0 && 'text-[#00be70]'
            }`}
          >
            <div>장소</div>
            <FontAwesomeIcon icon={faChevronDown} className={`text-sm  pl-2 text-[#ccc]`} />
          </button>
          <button
            onClick={() => setFilterModalIsOpen(true)}
            className={`border-2 rounded-3xl  pl-3 pr-2 border-[#eeeeee] py-1 flex items-center w-full ${
              sex.length !== 0 && 'text-[#00be70]'
            }`}
          >
            <div className="">성별</div>
            <FontAwesomeIcon icon={faChevronDown} className={`text-sm  pl-2 text-[#ccc]`} />
          </button>
        </div>
      </div>
      <div className="flex ">
        <div className="flex items-center" onClick={onReset}>
          <FontAwesomeIcon icon={faRotateRight} className="pr-1" />
          <div className="border-r-2 pr-2">초기화</div>
        </div>

        <div className="flex items-center pl-2" onClick={onSort}>
          {sort === ASC ? (
            <FontAwesomeIcon icon={faArrowUpWideShort} className="pr-1" />
          ) : (
            <FontAwesomeIcon icon={faArrowDownWideShort} className="pr-1" />
          )}
          <div>시간순</div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesFilter;
