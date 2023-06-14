import { useEffect, useState } from 'react';
import './App.css';
import MyHeader from './components/myHeader/MyHeader';

function App() {
  const [news, setNews] = useState([]);
  const [order, setOrder] = useState('new');

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

  return (
    <>
      <MyHeader setOrder={setOrder} order={order} />
      {news.map((newsItem) => (
        <div key={newsItem.id}>{newsItem.content}</div>
      ))}
    </>
  );
}

export default App;
