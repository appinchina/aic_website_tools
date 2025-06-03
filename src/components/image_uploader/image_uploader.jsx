import { useState } from "react";
import "./styles.css";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState("technologies-hub-images");
  const [targetHeight, setTargetHeight] = useState("60");
  const [maxWidth, setMaxWidth] = useState("260");
  const [quality, setQuality] = useState("85");
  const [originalFilename, setOriginalFilename] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOriginalFilename(e.target.files[0]?.name || "");
    setError(null); // Clear any previous errors when file changes
  };

  const processValidationError = (errorDetail) => {
    if (Array.isArray(errorDetail)) {
      return errorDetail.map(err => {
        const field = err.loc[err.loc.length - 1];
        return `${field}: ${err.msg}`;
      }).join(', ');
    }
    return errorDetail;
  };

  const getErrorMessage = (status, data) => {
    switch (status) {
      case 401:
        switch (data.detail) {
          case "No token provided":
            return "Authentication failed: No API token provided. Please check your configuration.";
          case "Invalid token":
            return "Authentication failed: The provided API token is invalid. Please check your token.";
          case "API token not configured":
            return "Authentication failed: API token is not configured. Please contact your administrator.";
          default:
            return "Authentication failed. Please check your API token.";
        }
      case 400:
        if (data.detail.includes("File too large")) {
          return "The file is too large. Maximum size is 10MB.";
        }
        if (data.detail.includes("Unsupported file type")) {
          return "Unsupported file type. Please use JPEG, PNG, or WebP images.";
        }
        if (data.detail.includes("Dimension")) {
          return data.detail;
        }
        return data.detail || "Invalid request. Please check your input.";
      case 422:
        return `Validation error: ${processValidationError(data.detail)}`;
      case 500:
        return "Server error. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again later.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    // Validate file size before upload
    if (file.size > 10 * 1024 * 1024) {
      setError("The file is too large. Maximum size is 10MB.");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("Unsupported file type. Please use JPEG, PNG, or WebP images.");
      return;
    }

    setError(null);
    setCopySuccess("");
    setResponse(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("target_height", targetHeight);
    formData.append("max_width", maxWidth);
    formData.append("quality", quality);
    formData.append("original_filename", originalFilename);

    try {
      const res = await fetch(
        "http://localhost:8080/tech-hub-img-processing/scale-image-from-upload",
        {
          method: "POST",
          headers: {
            "X-User-Token": "S8TKXnPsfahdsfg56kYFDD1Lwi3FYaXIJ4QvWgUtJf",
          },
          body: formData,
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw { 
          status: res.status,
          data: { detail: "Invalid response from server" }
        };
      }

      if (!res.ok) {
        throw { status: res.status, data };
      }

      setResponse(data);
    } catch (err) {
      if (err.status) {
        setError(getErrorMessage(err.status, err.data));
      } else {
        setError(
          "An unexpected error occurred. Please try again later or contact the administrator."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Image Uploader</h2>
      <form onSubmit={handleSubmit}>
        <div className="uploader-form-group">
          <label>Image File:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="uploader-form-group">
          <label>Folder:</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            required
          />
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
      {error && <div className="uploader-error">{error}</div>}
      {!error && response && (
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
      )}
    </div>
  );
};

export default ImageUploader;
