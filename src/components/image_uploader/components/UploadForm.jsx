import { useState } from 'react';
import PropTypes from 'prop-types';
import { FOLDER_OPTIONS } from '../constants';

const UploadForm = ({ onSubmit, isLoading, file, onFileChange }) => {
  const [folder, setFolder] = useState("technologies-hub-images");
  const [targetHeight, setTargetHeight] = useState("60");
  const [maxWidth, setMaxWidth] = useState("260");
  const [quality, setQuality] = useState("85");
  const [originalFilename, setOriginalFilename] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setOriginalFilename(file.name);
    onFileChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("target_height", targetHeight);
    formData.append("max_width", maxWidth);
    formData.append("quality", quality);
    formData.append("original_filename", originalFilename);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="uploader-form-group">
        <label htmlFor="custom-file-input">Image File:</label>
        <input
          id="custom-file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="file-input"
        />
        {/* <span className="selected-file-name">{file ? file.name : 'No file chosen'}</span> */}
      </div>
      <div className="uploader-form-group">
        <label>S3 Folder:</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          required
        >
          {FOLDER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="uploader-form-group">
        <label>Target Height:</label>
        <input
          type="number"
          value={targetHeight}
          onChange={(e) => setTargetHeight(e.target.value)}
          required
        />
      </div>
      <div className="uploader-form-group">
        <label>Max Width:</label>
        <input
          type="number"
          value={maxWidth}
          onChange={(e) => setMaxWidth(e.target.value)}
          required
        />
      </div>
      <div className="uploader-form-group">
        <label>Quality:</label>
        <input
          type="number"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          required
        />
      </div>
      <div className="uploader-form-group">
        <label>Original Filename:</label>
        <input
          type="text"
          value={originalFilename}
          onChange={(e) => setOriginalFilename(e.target.value)}
          required
        />
      </div>
      <button 
        disabled={!file || isLoading}
        type="submit" 
        className={`uploader-btn ${isLoading ? 'uploader-btn-loading' : ''}`}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

UploadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  file: PropTypes.object,
  onFileChange: PropTypes.func.isRequired
};

export default UploadForm; 