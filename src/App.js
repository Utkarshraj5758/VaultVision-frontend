// src/App.js
import React, { useState } from 'react';
import MasterSetup from './components/MasterSetup';
import FileEncryption from './components/FileEncryption';
import SecretMessage from './components/SecretMessage';
import './App.css';

function App() {
  const [tab, setTab] = useState('master');

  return (
    <div className="App">
      <h1>🔐 Secure Encryption & Steganography App</h1>
      <div className="tabs">
        <button onClick={() => setTab('master')}>Master Setup</button>
        <button onClick={() => setTab('file')}>File Encryption</button>
        <button onClick={() => setTab('message')}>Secret Message</button>
      </div>

      <div className="tab-content">
        {tab === 'master' && <MasterSetup />}
        {tab === 'file' && <FileEncryption />}
        {tab === 'message' && <SecretMessage />}
      </div>
    </div>
  );
}

export default App;
