export const processValidationError = (errorDetail) => {
  if (Array.isArray(errorDetail)) {
    return errorDetail.map(err => {
      const field = err.loc[err.loc.length - 1];
      return `${field}: ${err.msg}`;
    }).join(', ');
  }
  return errorDetail;
};

export const getErrorMessage = (status, data) => {
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