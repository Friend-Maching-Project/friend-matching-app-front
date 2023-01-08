import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleWriteButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-5 left-1/2 translate-x-[-50%]">
      <button
        className="bg-[#f9f9f9] px-4 py-2 flex items-center border-2 border-[#d4d4d4] rounded-3xl "
        onClick={() => navigate('/article-write')}
      >
        <FontAwesomeIcon icon={faPen} className="pr-2 text-green-dark text-lg" />
        <div className="font-bold text-sm"> 글 쓰기</div>
      </button>
    </div>
  );
};

export default ArticleWriteButton;
