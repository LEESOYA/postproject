const createErrorCode = (code, httpStatus, message) => {
  return { code, httpStatus, message };
};

const ErrorCode = {
  NOT_EXIST_POST: createErrorCode(101, 404, "post not exist"),
  SERVER_ERROR: createErrorCode(500, 500, "internal server error"),
};

const createApiError = (code, detail) => {
  return new ApiError(code, detail);
};

class ApiError extends Error {
  constructor(code, detail) {
    super();
    this.code = code;
    if (detail) {
      this.detail = detail;
    } else {
      this.detail = "";
    }
  }
}

module.exports = {
  ApiError,
  createApiError,
  ErrorCode,
};
