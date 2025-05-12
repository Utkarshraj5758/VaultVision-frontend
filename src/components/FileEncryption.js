// src/components/FileEncryption.js
import React, { useState } from 'react';

function FileEncryption() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleEncrypt = async () => {
    if (!file || !password) return setResult("Password and file required!");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    const res = await fetch('https://backend-9-ysxh.onrender.com/encrypt_file', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setResult("File encrypted successfully!");
    } else {
      const data = await res.json();
      setResult(data.error || 'Encryption failed');
    }
  };

  const handleDecrypt = async () => {
    if (!file || !password) return setResult("Password and file required!");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    const res = await fetch('https://backend-9-ysxh.onrender.com/decrypt_file', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setResult("File decrypted successfully!");
    } else {
      const data = await res.json();
      setResult(data.error || 'Decryption failed');
    }
  };

  return (
    <div>
      <h2>File Encryption</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleEncrypt}>Encrypt File</button>
      <button onClick={handleDecrypt}>Decrypt File</button>
      <p>{result}</p>
      {downloadUrl && <a href={downloadUrl} download="processed_file">Download Result</a>}
    </div>
  );
}

export default FileEncryption;
