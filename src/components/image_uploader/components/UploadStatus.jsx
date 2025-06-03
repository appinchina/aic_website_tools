import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UploadStatus = ({ error: propError, response }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const [error, setError] = useState(propError);

  // Update error state when propError changes
  useEffect(() => {
    setError(propError);
  }, [propError]);

  const copyToClipboard = async () => {
    if (response?.s3_url) {
      try {
        await navigator.clipboard.writeText(response.s3_url);
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        setError("Failed to copy URL");
      }
    }
  };

  if (error) {
    return (
      <div className="uploader-error-container">
        <div className="uploader-error-icon">⚠️</div>
        <div className="uploader-error">{error}</div>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div>
      <div className="uploader-success">Upload successful!</div>
      <div className="uploader-url">
        <strong>S3 URL:</strong>{" "}
        <a href={response.s3_url} target="_blank" rel="noopener noreferrer">
          {response.s3_url}
        </a>
      </div>
      <button className="uploader-copy-btn" onClick={copyToClipboard}>
        Copy URL
      </button>
      {copySuccess && (
        <span className="uploader-copied">{copySuccess}</span>
      )}
    </div>
  );
};

UploadStatus.propTypes = {
  error: PropTypes.string,
  response: PropTypes.shape({
    s3_url: PropTypes.string.isRequired
  })
};

export default UploadStatus; 