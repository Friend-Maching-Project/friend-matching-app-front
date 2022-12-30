import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Article from '../components/Article';
import ArticlesFilter from '../components/Articles/ArticlesFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  clearArticles,
  getArticlesWithFilter,
  getArticlesWithoutFilter,
} from '../redux/modules/articles';
import { ClipLoader } from 'react-spinners';
import { DESC, SIZE } from '../constants';

const ArticlePage = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(DESC);
  const [places, setPlaces] = useState([]);
  const [sex, setSex] = useState([]);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const { articles, isLoading, hasMoreArticles } = useSelector((state) => state.articles);

  const onReset = () => {
    setPlaces([]);
    setSex([]);
    dispatch(clearArticles());
    firstGetArticlesWithoutFilter();
  };

  const firstGetArticlesWithoutFilter = () => {
    if (sort === DESC) {
      dispatch(
        getArticlesWithoutFilter({
          lastArticleId: Number.MAX_SAFE_INTEGER,
          size: SIZE,
          sort,
        }),
      );
    } else {
      dispatch(
        getArticlesWithoutFilter({
          lastArticleId: 0,
          size: SIZE,
          sort,
        }),
      );
    }
  };

  const firstGetArticlesWithFilter = () => {
    if (sort === DESC) {
      dispatch(
        getArticlesWithFilter({
          lastArticleId: Number.MAX_SAFE_INTEGER,
          size: SIZE,
          sort,
          place: places,
          sex,
        }),
      );
    } else {
      dispatch(
        getArticlesWithFilter({
          lastArticleId: 0,
          size: SIZE,
          sort,
          place: places,
          sex,
        }),
      );
    }
  };

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 10 &&
        document.documentElement.clientHeight !== document.documentElement.scrollHeight
      ) {
        if (hasMoreArticles && !isLoading && articles) {
          if (places.length !== 0 || sex.length !== 0) {
            dispatch(
              getArticlesWithFilter({
                lastArticleId: articles[articles.length - 1].articleId,
                size: SIZE,
                sort,
                place: places,
                sex,
              }),
            );
          } else {
            dispatch(
              getArticlesWithoutFilter({
                lastArticleId: articles[articles.length - 1].articleId,
                size: SIZE,
                sort,
              }),
            );
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [articles, isLoading, hasMoreArticles]);

  useEffect(() => {
    if (places.length !== 0 || sex.length !== 0) {
      dispatch(clearArticles());
      firstGetArticlesWithFilter();
    }
  }, [places, sex]);

  useEffect(() => {
    if (articles) {
      dispatch(clearArticles());
    }
    if (places.length !== 0 || sex.length !== 0) {
      firstGetArticlesWithFilter();
    } else {
      firstGetArticlesWithoutFilter();
    }
  }, [sort]);

  return (
    <>
      <Layout px="px-4 bg-[#f0f0f0]">
        <div className="fixed top-0 left-0 right-0 w-full flex justify-between border-b-2 border-black items-center py-2 px-4 bg-[#ffffff]">
          <FontAwesomeIcon icon={faBars} className="text-4xl text-waniGreen" />
          <img src="./logo.png" alt="logo" className="h-12" />
          <FontAwesomeIcon icon={faBell} className="text-4xl text-waniGreen" />
        </div>
        <ArticlesFilter
          places={places}
          setPlaces={setPlaces}
          sex={sex}
          setSex={setSex}
          filterModalIsOpen={filterModalIsOpen}
          setFilterModalIsOpen={setFilterModalIsOpen}
          onReset={onReset}
          sort={sort}
          setSort={setSort}
        />
        <div className="pt-articles-container pb-4">
          {articles &&
            articles.map((article) => (
              <Article
                place={article.place}
                comment={article.comment}
                createdAt={article.createdAt}
                meetAt={article.meetAt}
                nickname={article.user.nickname}
                articleComment={article.articleComment}
                key={article.articleId}
              />
            ))}
          <div className="flex justify-center pt-1">{isLoading && <ClipLoader />}</div>
        </div>
      </Layout>
    </>
  );
};

export default ArticlePage;
