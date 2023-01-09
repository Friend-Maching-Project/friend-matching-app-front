import axios from 'axios';
import moment from 'moment/moment';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COMMENT_DELETE_ERROR } from '../../constants';

const ArticleComment = ({
  articleId,
  articleCommentId,
  articleUserId,
  content,
  createdAt,
  user,
}) => {
  const navigate = useNavigate();
  const loginUserId = useSelector((s) => s.auth.user.id);

  const onDelete = () => {
    axios
      .delete('/comments', {
        params: {
          id: articleCommentId,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate(0);
        } else {
          alert(COMMENT_DELETE_ERROR);
        }
      })
      .catch(() => {
        alert(COMMENT_DELETE_ERROR);
      });
  };

  return (
    <div className="px-4 py-2 border-b border-gray-light relative">
      <div className="h-8 flex">
        <div className="w-6 h-6 rounded mr-2">
          <img src="../logo.png" alt="logo" className="h-full" />
        </div>
        {articleUserId === user.id ? (
          <div className="font-bold text-green">{`${user.nickname}(글쓴이)`}</div>
        ) : (
          <div className="font-bold">{user.nickname}</div>
        )}
      </div>
      <div>{content}</div>
      <div className="text-sm text-gray">{moment(createdAt).format('MM-DD HH:mm')}</div>
      {loginUserId !== user.id ? (
        <button className="bg-green-dark text-[#fff] text-sm px-2 py-0.5 rounded-2xl flex items-center absolute top-2 right-4">
          채팅
        </button>
      ) : (
        <button
          className="bg-green-dark text-[#fff] text-sm px-2 py-0.5 rounded-2xl flex items-center absolute top-2 right-4"
          onClick={onDelete}
        >
          삭제
        </button>
      )}
    </div>
  );
};

export default ArticleComment;
