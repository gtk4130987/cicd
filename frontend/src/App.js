import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // CHANGE THIS: Replace with your VM's external IP
  const BACKEND_URL = 'http://YOUR_VM_IP:8000';

  useEffect(() => {
    // Fetch backend status
    fetch(`${BACKEND_URL}/api/status`)
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data.status);
      })
      .catch(err => {
        setBackendStatus('Backend not reachable');
        console.error(err);
      });

    // Fetch data from backend
    fetch(`${BACKEND_URL}/api/data`)
      .then(res => res.json())
      .then(data => {
        setItems(data.items);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 CI/CD Pipeline Demo</h1>
        <p>React Frontend + FastAPI Backend</p>
        
        <div className="status-box">
          <h2>Backend Status</h2>
          <p className={backendStatus.includes('running') ? 'success' : 'error'}>
            {backendStatus}
          </p>
        </div>

        <div className="items-box">
          <h2>Data from Backend</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {items.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;