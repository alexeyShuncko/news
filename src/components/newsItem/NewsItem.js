import s from './NewsItem.module.css';
import user from '../../images/user.png';
import { useState } from 'react';

const NewsItem = ({ newsItem }) => {
  const [active, setActive] = useState('Левый');

  const clickBtn = (e) => {
    setActive(e.target.innerText);
  };

  return (
    <div className={s.news}>
      <div className={s.headerNews}>
        <div className={s.photo}>
          <img src={user} alt="Фото" />
        </div>
        <div className={s.name}>
          <span>{newsItem.author}</span>
        </div>
        <div className={s.btnBlock}>
          <button
            className={active === 'Левый' ? s.activeBtn : s.btn}
            onClick={clickBtn}>
            Левый
          </button>
          <button
            className={active === 'Центр' ? s.activeBtn : s.btn}
            onClick={clickBtn}>
            Центр
          </button>
          <button
            className={active === 'Правый' ? s.activeBtn : s.btn}
            onClick={clickBtn}>
            Правый
          </button>
        </div>
        <div className={s.starContainer}>
          <div className={s.star}></div>
        </div>
      </div>
      <div className={s.contentNews}>
        <div className={s.content}>
          <div>{newsItem.date.slice(11, 16)}</div>
          <div>{newsItem.content}</div>
        </div>
        {newsItem.attachments.length > 0 && (
          <div>
            {newsItem.attachments[0].type === 'image' ? (
              <img
                src={newsItem.attachments[0].url}
                alt="Картинка"
                className={s.imgNews}
              />
            ) : (
              <video
                width="300"
                height="200"
                controls="controls"
                className={s.videoNews}>
                <source src={newsItem.attachments[0].url} />
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default NewsItem;
