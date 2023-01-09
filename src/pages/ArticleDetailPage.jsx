import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState } from 'react';
import Loading from '../components/Loading';
import moment from 'moment/moment';
import ArticleComment from '../components/Articles/ArticleComment';
import { ARTICLE_LOAD_ERROR, COMMENT_ERROR, LOGIN_ERROR } from '../constants';

const ArticleDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleDetail, setArticleDetail] = useState();
  const [comment, setComment] = useState('');

  const changeDate = (date) => {
    return moment(date).format('MM-DD HH:mm');
  };

  const onCommentSubmit = () => {
    if (comment.length > 0) {
      axios
        .post('/comments/new', {
          articleId: id,
          content: comment,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate(0);
          } else {
            alert(COMMENT_ERROR);
          }
        })
        .catch((res) => {
          if (res.response.status === 401) {
            alert(LOGIN_ERROR);
            navigate('/login');
          } else {
            alert(COMMENT_ERROR);
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(`/article/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setArticleDetail(res.data);
        } else {
          alert(ARTICLE_LOAD_ERROR);
          navigate('/');
        }
      })
      .catch(() => {
        alert(ARTICLE_LOAD_ERROR);
        navigate('/');
      });
  }, []);
  return (
    <>
      {articleDetail ? (
        <Layout>
          {/* Header s */}
          <div className="w-full flex justify-between border-b-2 border-black items-center py-2 px-4 bg-[#ffffff] relative">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-4xl text-green-dark"
              onClick={() => navigate('/')}
            />
            <img
              src="../logo.png"
              alt="logo"
              className="absolute left-1/2 translate-x-[-50%] text-xl font-bold h-full py-1"
            />
            <button className="bg-green-dark text-[#fff] px-3 py-1 rounded-2xl flex items-center">
              채팅
            </button>
          </div>
          {/* Header e */}

          {/* Content s */}
          <div className="px-4 pt-3">
            <div className="flex items-center h-12">
              <div className="w-10 h-10 rounded-full mr-2">
                <img src="../logo.png" alt="logo" className="h-full" />
              </div>
              <div>
                <div className="font-bold text-lg">{articleDetail.user.nickname}</div>
                <div className="text-sm text-gray">{changeDate(articleDetail.createdAt)}</div>
              </div>
            </div>
            <div className="flex mt-1">
              <div className="bg-green text-white text-sm px-1.5 py-0.5 rounded-xl mr-2">
                {articleDetail.place}
              </div>
              <div className="bg-green text-white text-sm px-1.5 py-0.5 rounded-xl">
                {changeDate(articleDetail.meetAt)}
              </div>
            </div>
            <div className="mt-2">{articleDetail.comment}</div>
            <div>
              <div className="flex items-center text-green-dark mt-2">
                <FontAwesomeIcon icon={faComment} className="text-sm mr-1" />
                <div className="text-sm">
                  {articleDetail.articleComment ? articleDetail.articleComment.length : 0}
                </div>
              </div>
            </div>
          </div>
          {/* Content e */}

          {/* Comment s */}
          <div className="border-t-2 border-gray-light mt-2 mb-16">
            {articleDetail.articleComment &&
              articleDetail.articleComment.map((item) => (
                <ArticleComment
                  articleId={id}
                  articleCommentId={item.articleCommentId}
                  articleUserId={articleDetail.user.id}
                  content={item.content}
                  createdAt={item.createdAt}
                  user={item.user}
                  key={item.articleCommentId}
                />
              ))}
          </div>
          {/* Comment e */}

          {/* Input s */}
          <div className="bg-white rounded-xl fixed left-0 right-0 bottom-0 py-2">
            <div className="flex items-center bg-gray-light rounded-xl px-4 mx-4">
              <input
                type="text"
                placeholder="댓글을 입력하세요."
                className="bg-gray-light w-full py-3 rounded-xl"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-green text-lg"
                onClick={onCommentSubmit}
              />
            </div>
          </div>
          {/* Input e */}
        </Layout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ArticleDetailPage;
