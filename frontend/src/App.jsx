import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage(err));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🚀 MERN App</h1>
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default App;
