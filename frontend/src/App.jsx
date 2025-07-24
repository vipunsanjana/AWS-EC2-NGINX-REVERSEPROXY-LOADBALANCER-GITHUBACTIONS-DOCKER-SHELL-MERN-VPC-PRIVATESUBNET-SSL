import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('/api/info')
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

  return (
    <div className="container">
      <h1>MERN Production App</h1>
      <section className="section">
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>🛒 {product.name}</li>
          ))}
        </ul>
      </section>

      {info && (
        <section className="section">
          <h2>🔐 Deployment Stack</h2>
          <p><strong>Project:</strong> {info.project}</p>
          <p><strong>Developer:</strong> {info.developer}</p>
          <ul>
            {info.stack.map((item, i) => (
              <li key={i}>✅ {item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default App;
