const createErrodCode = errorMsg => {
  return { errorMsg };
};

const ErrorMessage = {
  NO_EXIST_ACCOUNT: createErrodCode("존재하지 않는 아이디입니다."),
  NO_EXIST_USER_PASSWORD: createErrodCode("잘못된 비밀 번호 입니다."),
};

const createParseError = detail => {
  return new ParseError(detail);
};

class ParseError extends Error {
  constructor(detail) {
    super();
    if (detail) {
      this.detail = detail;
    } else {
      this.detail = "";
    }
  }
}
module.exports = {
  ParseError,
  createParseError,
  ErrorMessage,
};
