import { useEffect, useState } from 'react';
import settings from '../../images/settings.svg';
import s from './MyHeader.module.css';

const MyHeader = ({ order, setOrder }) => {
  const [isHidden, setIsHidden] = useState(true);

  const clickHandler = (e) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const changeHandler = (e) => {
    e.target.checked = !e.target.checked;
    if (e.target.id === 'newNews') {
      setOrder('new');
    } else setOrder('old');
  };

  useEffect(() => {
    const fn = () => {
      setIsHidden(true);
    };
    if (isHidden === false) {
      document.addEventListener('click', fn);
    }
    return () => document.removeEventListener('click', fn);
  }, [isHidden]);

  return (
    <header className={s.myHead}>
      <span>Лента новостей</span>
      <img src={settings} alt="Настройки" onClick={clickHandler} />
      {!isHidden && (
        <div className={s.hiddenMenu}>
          <div>
            <input
              type="radio"
              id="newNews"
              name="news"
              checked={order === 'new' && true}
              onChange={changeHandler}
            />
            <label htmlFor="newNews">Сначала новые новости</label>
          </div>
          <div>
            <input
              type="radio"
              id="oldNews"
              name="news"
              checked={order === 'old' && true}
              onChange={changeHandler}
            />
            <label htmlFor="oldNews">Сначала старые новости</label>
          </div>
        </div>
      )}
    </header>
  );
};
export default MyHeader;
