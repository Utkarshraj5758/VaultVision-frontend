// src/components/MasterSetup.js
import React, { useState } from 'react';

function MasterSetup() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('https://backend-9-ysxh.onrender.com/set_master_password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    setResult(data.message || data.error);
  };

  return (
    <div>
      <h2>Set Master Password</h2>
      <input
        type="password"
        placeholder="Enter master password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Set Password</button>
      <p>{result}</p>
    </div>
  );
}

export default MasterSetup;
