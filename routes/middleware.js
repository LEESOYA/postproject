const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");

exports.name = () => {
  console.log("미들웨어 테스트");
};

exports.deleteAlert = () => {
  alert("삭제하시겠습니까?");
};

exports.messageFlash = () => {
  console.log("////////");
  // switch (msg) {
  //   case loginFail:
  //     return "로그인 실패";
  // }
};

exports.test = () => {};
