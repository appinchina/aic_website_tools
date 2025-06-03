import { useState } from 'react';
import { API_ENDPOINT_DEV, API_ENDPOINT_PROD, API_TOKEN, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants';
import { getErrorMessage } from '../utils';

const FORCE_PRODUCTION_ENDPOINT = true;

export const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    console.log('File change event triggered');
    console.log('Event object:', e);
    console.log('Files array:', e.target.files);
    console.log('Selected file:', e.target.files[0]);
    setFile(e.target.files[0]);
    setError(null);
  };

  const uploadImage = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(FORCE_PRODUCTION_ENDPOINT ? API_ENDPOINT_PROD : API_ENDPOINT_DEV, {
        method: "POST",
        headers: {
          "X-User-Token": API_TOKEN,
        },
        body: formData,
      });

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

  const validateFile = (file) => {
    if (!file) {
      setError("Please select a file.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The file is too large. Maximum size is 10MB.");
      return false;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Unsupported file type. Please use JPEG, PNG, or WebP images.");
      return false;
    }

    return true;
  };

  return {
    file,
    response,
    error,
    isLoading,
    handleFileChange,
    uploadImage,
    validateFile,
  };
}; 