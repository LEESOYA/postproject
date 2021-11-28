const { createApiError, ErrorCode, ApiError } = require("./apiError");

module.exports = handler => {
  return (request, response, next) => {
    handler(request, response).catch(err => {
      if (err instanceof ApiError) {
        next(err);
      } else {
        next(createApiError(ErrorCode.SERVER_ERROR));
      }
    });
  };
};
