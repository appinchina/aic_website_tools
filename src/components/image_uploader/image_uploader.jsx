import "./styles.css";
import UploadForm from "./components/UploadForm";
import UploadStatus from "./components/UploadStatus";
import { useImageUpload } from "./hooks/useImageUpload";

const ImageUploader = () => {
  const {
    file,
    response,
    error,
    isLoading,
    handleFileChange,
    uploadImage,
    validateFile,
  } = useImageUpload();

  const handleSubmit = async (formData) => {
    if (!validateFile(file)) {
      return;
    }
    await uploadImage(formData);
  };

  return (
    <div className="uploader-container">
      <h2 className="uploader-title">Image Uploader</h2>
      <UploadForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        file={file}
        onFileChange={handleFileChange}
      />
      <UploadStatus error={error} response={response} />
    </div>
  );
};

export default ImageUploader;
