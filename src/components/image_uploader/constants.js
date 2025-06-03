export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const API_ENDPOINT_DEV = "http://localhost:8080/tech-hub-img-processing/scale-image-from-upload";
export const API_ENDPOINT_PROD = "https://minbackend.appinchina.co/tech-hub-img-processing/scale-image-from-upload";
export const API_TOKEN = "S8TKXnPsfahdsfg56kYFDD1Lwi3FYaXIJ4QvWgUtJf";

export const FOLDER_OPTIONS = [
  { value: "technologies-hub-images", label: "technologies-hub-images" },
  { value: "temp-files", label: "temp-files" },
  { value: "test-folder", label: "test-folder" }
]; 