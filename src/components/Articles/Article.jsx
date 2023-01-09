import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import moment from 'moment/moment';

const Article = ({
  articleId,
  nickname,
  place,
  comment,
  createdAt,
  meetAt,
  articleComment,
  onArticle,
}) => {
  const today = moment();
  createdAt = moment(createdAt, 'YYYY-MM-DD HH:mm:ss');
  meetAt = moment(meetAt, 'YYYY-MM-DD HH:mm').format('MM-DD HH:mm');
  const diff = today.diff(createdAt, 'seconds');

  const minutes = () => {
    if (diff < 60) {
      return diff + '초전';
    } else if (diff >= 60 && diff < 3600) {
      return parseInt(diff / 60) + '분전';
    } else if (diff >= 3600 && diff < 86400) {
      return parseInt(diff / 60 / 60) + '시간전';
    } else {
      return createdAt.format('MM-DD');
    }
  };

  return (
    <div className=" bg-[#ffffff] mt-3 px-2 py-1 rounded-lg" onClick={() => onArticle(articleId)}>
      <div className="flex justify-between">
        <div className="text-lg font-bold">{nickname}</div>
        <div className="text-sm text-[#a6a6a6]">{minutes()}</div>
      </div>

      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">{comment}</div>
      <div className="flex justify-between pb-1">
        <div className="flex text-[#737373]">
          <div className="text-sm">{place}</div>
          <div className="text-sm px-1">|</div>
          <div className="text-sm">{meetAt}</div>
        </div>
        <div className="flex items-center text-green-dark">
          <FontAwesomeIcon icon={faComment} className="text-sm mr-1" />
          <div className="text-sm">{articleComment ? articleComment.length : 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Article;
