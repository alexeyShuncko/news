import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import MyHeader from './components/myHeader/MyHeader';
import NewsItem from './components/newsItem/NewsItem';

function App() {
  const [news, setNews] = useState([]);
  const [order, setOrder] = useState('old');

  const updateStorage = (el) => {
    !localStorage.getItem(el.id) &&
      localStorage.setItem(
        el.id,
        JSON.stringify({
          id: el.id,
          star: false,
        })
      );
  };

  useLayoutEffect(() => {
    let bodyFormData = new FormData();
    bodyFormData.append('actionName', 'MessagesLoad');

    fetch('http://a0830433.xsph.ru/', {
      method: 'post',
      body: bodyFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        setNews(data.Messages);
        data.Messages.map(updateStorage);
      });
  }, []);

  useEffect(() => {
    const fetchFn = () => {
      let bodyFormData = new FormData();
      bodyFormData.append('actionName', 'MessagesLoad');
      bodyFormData.append('messageId', news[news.length - 1].id);

      fetch('http://a0830433.xsph.ru/', {
        method: 'post',
        body: bodyFormData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === 'no message') {
            return;
          } else {
            setNews(news.concat(data.Messages));
            data.Messages.map(updateStorage);
          }
        });
    };
    let id = setInterval(fetchFn, 5000);
    return () => clearInterval(id);
  });

  return (
    <>
      <MyHeader setOrder={setOrder} order={order} />
      <div className="containerNews">
        {order === 'old' && news.length !== 0
          ? news.map((newsItem, i) => <NewsItem newsItem={newsItem} key={i} />)
          : news
              .map((newsItem, i) => <NewsItem newsItem={newsItem} key={i} />)
              .reverse()}
      </div>
    </>
  );
}

export default App;
