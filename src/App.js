import { useEffect, useState } from 'react';
import './App.css';
import MyHeader from './components/myHeader/MyHeader';
import NewsItem from './components/newsItem/NewsItem';

function App() {
  const [news, setNews] = useState([]);
  const [order, setOrder] = useState('old');

  useEffect(() => {
    let bodyFormData = new FormData();
    bodyFormData.append('actionName', 'MessagesLoad');
    // bodyFormData.append('messageId', '2698');

    fetch('http://a0830433.xsph.ru/', {
      method: 'post',
      body: bodyFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data.Messages);
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
          console.log(data);
        });
    };
    let id = setInterval(fetchFn, 5000);
    return () => clearInterval(id);
  });

  return (
    <>
      <MyHeader setOrder={setOrder} order={order} />
      <div className="containerNews">
        {order === 'old'
          ? news.map((newsItem) => (
              <NewsItem newsItem={newsItem} key={newsItem.id} />
            ))
          : news
              .map((newsItem) => (
                <NewsItem newsItem={newsItem} key={newsItem.id} />
              ))
              .reverse()}
      </div>
    </>
  );
}

export default App;
