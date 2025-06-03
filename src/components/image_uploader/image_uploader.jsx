import { useState } from 'react';
import './styles.css';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState('technologies-hub-images');
  const [targetHeight, setTargetHeight] = useState('60');
  const [quality, setQuality] = useState('85');
  const [originalFilename, setOriginalFilename] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOriginalFilename(e.target.files[0]?.name || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }
    setError(null);
    setCopySuccess('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('target_height', targetHeight);
    formData.append('quality', quality);
    formData.append('original_filename', originalFilename);

    try {
      const res = await fetch('http://localhost:8080/tech-hub-img-processing/scale-image-from-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Upload failed.');
    }
  };

  const copyToClipboard = async () => {
    if (response?.s3_url) {
      try {
        await navigator.clipboard.writeText(response.s3_url);
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      } catch (err) {
        setError('Failed to copy URL');
      }
    }
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Image Uploader</h2>
      <form onSubmit={handleSubmit}>
        <div className="uploader-form-group">
          <label>Image File:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div className="uploader-form-group">
          <label>Folder:</label>
          <input type="text" value={folder} onChange={e => setFolder(e.target.value)} required />
        </div>
        <div className="uploader-form-group">
          <label>Target Height:</label>
          <input type="number" value={targetHeight} onChange={e => setTargetHeight(e.target.value)} required />
        </div>
        <div className="uploader-form-group">
          <label>Quality:</label>
          <input type="number" value={quality} onChange={e => setQuality(e.target.value)} required />
        </div>
        <div className="uploader-form-group">
          <label>Original Filename:</label>
          <input type="text" value={originalFilename} onChange={e => setOriginalFilename(e.target.value)} required />
        </div>
        <button type="submit" className="uploader-btn">Upload</button>
      </form>
      {error && <div className="uploader-error">{error}</div>}
      {response && (
        <div>
          <div className="uploader-success">Upload successful!</div>
          <div className="uploader-url">
            <strong>S3 URL:</strong>{' '}
            <a href={response.s3_url} target="_blank" rel="noopener noreferrer">
              {response.s3_url}
            </a>
          </div>
          <button className="uploader-copy-btn" onClick={copyToClipboard}>Copy URL</button>
          {copySuccess && <span className="uploader-copied">{copySuccess}</span>}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
