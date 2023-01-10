import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  ARTICLE_LOAD_ERROR,
  ARTICLE_UPDATE_ERROR,
  ARTICLE_WRITE_ERROR,
  DATES,
  LOGIN_ERROR,
  PLACES,
} from '../constants';
import moment from 'moment/moment';
import { useEffect } from 'react';
import Loading from '../components/Loading';

const ArticleWritePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [placeMessage, setPlaceMessage] = useState('');
  const [date, setDate] = useState('');
  const [dateMessage, setdateMessage] = useState('');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [time, setTime] = useState('AM');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/article/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setPlace(res.data.place);
            setComment(res.data.comment);
            setIsLoading(false);
          } else {
            alert(ARTICLE_LOAD_ERROR);
            navigate('/');
          }
        })
        .catch(() => {
          alert(ARTICLE_LOAD_ERROR);
          navigate('/');
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const onHour = (e) => {
    if (e.target.value > 12) {
      setHour(12);
    } else if (e.target.value < 0) {
      setHour(12);
    } else {
      setHour(e.target.value);
    }
  };

  const onMinute = (e) => {
    if (e.target.value >= 60) {
      setMinute('00');
    } else if (e.target.value < 0) {
      setMinute('00');
    } else {
      setMinute(e.target.value);
    }
  };

  const onTime = (e) => {
    setTime(e.target.textContent);
  };

  const onComment = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = () => {
    if (place === '' || place === undefined) {
      setPlaceMessage('장소를 입력해주세요.');
    }
    if (date === '' || date === undefined) {
      setdateMessage('일시를 입력해주세요.');
    }
    if (place !== '' && place !== undefined && date !== '' && date !== undefined) {
      const day = date === '오늘' ? 0 : date === '1일 후' ? 1 : 2;
      const meetAt = moment(`${moment().format('YYYY-MM-DD')} ${hour}:${minute}`)
        .add(day, 'd')
        .format();
      if (id === undefined) {
        axios
          .post('/article', {
            place,
            comment,
            meetAt,
          })
          .catch((err) => {
            if (err.response.status === 401) {
              alert(LOGIN_ERROR);
              navigate('/login');
            } else {
              alert(ARTICLE_WRITE_ERROR);
              navigate('/');
            }
          })
          .then((res) => {
            if (res.status === 200) {
              navigate('/');
            }
          });
      } else {
        axios
          .put(`/article/${id}`, {
            place,
            comment,
            meetAt,
          })
          .catch((err) => {
            if (err.response.status === 401) {
              alert(LOGIN_ERROR);
              navigate('/login');
            } else {
              alert(ARTICLE_UPDATE_ERROR);
              navigate('/');
            }
          })
          .then((res) => {
            if (res.status === 200) {
              navigate(`/articles/${id}`);
            }
          });
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          {/* Header s */}
          <div className="w-full flex justify-between border-b-2 border-black items-center py-2 px-4 bg-[#ffffff]">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-4xl text-green-dark"
              onClick={() => navigate('/')}
            />
            <div className="absolute left-1/2 translate-x-[-50%] text-xl font-bold">글 쓰기</div>
            <button className="bg-green-dark text-[#fff] px-3 py-1 rounded-2xl" onClick={onSubmit}>
              완료
            </button>
          </div>
          {/* Header e */}

          <div className="px-4">
            {/* 장소 s */}
            <div className="ml-1 pt-3 pb-1 text-green-dark font-bold ">
              <div>장소</div>
            </div>
            <div className="flex justify-center">
              {PLACES.map((item) => (
                <div
                  key={item}
                  className={`basis-1/4 py-2 mx-2 first:ml-0 last:mr-0 border-2 border-green rounded ${
                    place === item && 'bg-green'
                  }`}
                >
                  <div
                    className={`text-center ${place === item ? 'text-[#ffffff]' : 'text-green'}`}
                    onClick={() => setPlace(item)}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm text-red mt-1">
              {(place === '' || place === undefined) && placeMessage}
            </div>
            {/* 장소 e */}

            {/* 일시 s */}
            <div className="ml-1 pt-3 pb-1 text-green-dark font-bold">일시</div>
            <div className="flex justify-center">
              {DATES.map((item) => (
                <div
                  key={item}
                  className={`basis-1/3 py-2 mx-4 first:ml-0 last:mr-0 border-2 border-green rounded ${
                    date === item && 'bg-green'
                  }`}
                >
                  <div
                    className={`text-center ${date === item ? 'text-[#ffffff]' : 'text-green'}`}
                    onClick={() => setDate(item)}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm ml-1 text-red">
              {(date === '' || date === undefined) && dateMessage}
            </div>
            {/* 일시 e */}

            {/* 시간 s */}
            <div>
              <div className="ml-1 pt-3 pb-1 text-green-dark font-bold">시간</div>
              <div className="flex">
                <div className="basis-1/5 mr-2">
                  <input
                    type="number"
                    className="w-full h-full py-2 rounded border-2 text-green border-green text-xl text-center"
                    value={hour}
                    onChange={onHour}
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-green w-1.5 h-1.5 rounded-full mb-2"></div>
                  <div className="bg-green w-1.5 h-1.5 rounded-full"></div>
                </div>

                <div className="basis-1/5 ml-2">
                  <input
                    type="number"
                    className="w-full h-full py-2 rounded border-2 text-green border-green text-center text-xl"
                    value={minute}
                    onChange={onMinute}
                  />
                </div>

                <div className="flex items-end">
                  <div className="border-2 border-green rounded basis-1/12 ml-2 flex h-2/3">
                    <div
                      className={`px-1 text-center ${
                        time === 'AM' ? 'text-[#fff] bg-green' : 'text-green'
                      }`}
                      onClick={onTime}
                    >
                      AM
                    </div>
                    <div
                      className={`px-1 text-center ${
                        time === 'PM' ? 'text-[#fff] bg-green' : 'text-green'
                      }`}
                      onClick={onTime}
                    >
                      PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 시간 e */}

            {/* 내용 s */}
            <div>
              <div className="text-green-dark font-bold ml-1 pt-3 pb-1">내용</div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="내용을 입력하세요."
                className="border-2 rounded border-green w-full focus:border-green px-2 py-1"
                value={comment}
                onChange={onComment}
              ></textarea>
            </div>
            {/* 내용 e */}
          </div>
        </Layout>
      )}
    </>
  );
};

export default ArticleWritePage;
