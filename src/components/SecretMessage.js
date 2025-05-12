// src/components/SecretMessage.js
import React, { useState } from 'react';

function SecretMessage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleHide = async () => {
    if (!file || !message) return setResult("File and message required!");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('message', message);

    const res = await fetch('http://127.0.0.1:5000/hide_message', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setResult("Message hidden in image!");
    } else {
      const data = await res.json();
      setResult(data.error || 'Failed to hide message');
    }
  };

  const handleReveal = async () => {
    if (!file) return setResult("File is required!");

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://127.0.0.1:5000/reveal_message', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setResult(data.message || data.error || 'Could not reveal message');
  };

  return (
    <div>
      <h2>Secret Message in Image</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Type secret message" value={message} onChange={e => setMessage(e.target.value)} />
      <br />
      <button onClick={handleHide}>Hide Message</button>
      <button onClick={handleReveal}>Reveal Message</button>
      <p>{result}</p>
      {downloadUrl && <a href={downloadUrl} download="stego_image.png">Download Image</a>}
    </div>
  );
}

export default SecretMessage;
