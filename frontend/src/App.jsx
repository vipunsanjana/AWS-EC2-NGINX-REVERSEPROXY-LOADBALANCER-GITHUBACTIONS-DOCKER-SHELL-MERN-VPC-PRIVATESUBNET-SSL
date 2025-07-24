import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState(null);
  const [newProduct, setNewProduct] = useState("");

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('/api/info')
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

  const addProduct = () => {
    if (!newProduct.trim()) return;
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct })
    })
      .then(res => res.json())
      .then(data => {
        setProducts(prev => [...prev, data]);
        setNewProduct("");
      });
  };

  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(prev => prev.filter(p => p.id !== id)));
  };

  return (
    <div className="container">
      <h1>🚀 MERN Production App</h1>

      <section className="section">
        <h2>🛍️ Products</h2>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter product name"
            value={newProduct}
            onChange={e => setNewProduct(e.target.value)}
          />
          <button onClick={addProduct}>Add</button>
        </div>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => deleteProduct(product.id)}>❌</button>
            </li>
          ))}
        </ul>
      </section>

      {info && (
        <section className="section">
          <h2>⚙️ Deployment Stack</h2>
          <p><strong>Project:</strong> {info.project}</p>
          <p><strong>Developer:</strong> {info.developer}</p>
          <ul>
            {info.stack.map((item, i) => (
              <li key={i}>✅ {item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>📢 About</h2>
        <p>This full-stack app is deployed with:</p>
        <ul>
          <li>🌐 AWS EC2 with Ubuntu</li>
          <li>🧰 Docker + GitHub Actions</li>
          <li>🔁 NGINX reverse proxy + load balancing</li>
          <li>🔒 HTTPS with SSL (Let's Encrypt)</li>
          <li>🔐 VPC + Private Subnet + IAM + Security Groups</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
