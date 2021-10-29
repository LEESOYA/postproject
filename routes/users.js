const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");
const { message } = require("./middleware");
const USERPATH = "../views/user/";

router.get("/login", (request, response, next) => {
  console.log(request.session.user_id);
  response.render(USERPATH + "userLogin", {
    userId: request.session.user_id,
  });
});

router.post("/login_process", (request, response, next) => {
  const user = request.body;
  const userId = user.userId;
  const userPw = user.userPw;
  // console.log(message(loginFail));
  db.query(
    `select * from user where userId = ? and  userPassword = ?`,
    [userId, userPw],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (!result[0]) {
        request.render("../views/user/userLogin", {
          loginMsg: message(loginFail),
        });
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.write(
          "<script type='text/javascript'>alert('로그인 실패')</script>"
        );
        response.write('<script>window.location="/users/login"</script>');
      } else {
        request.session.is_logined = true;
        request.session.user_id = userId;
        // response.render("../views/post/post", { userId: result[0].userId });
        response.redirect("../");
      }
    }
  );
});

router.get("/pwdFind", (request, response, next) => {
  response.render("../views/user/pwdFind", {
    userId: request.session.user_id,
  });
});

router.post("/pwdFind_process", (request, response) => {
  const userId = request.body.userId;
  db.query(` select * from user where userId = ?`, [userId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result[0].userPassword);
  });
  response.send("");
});

router.get("/logout", (request, response, next) => {
  request.session.destroy(err => {
    if (err) {
      console.log(err);
    }
  });
  response.redirect("../");
});

router.get("/join", (request, response, next) => {
  response.render(USERPATH + "userJoin", {
    userId: request.session.user_id,
  });
});

router.post("/join_process", (request, response) => {
  const user = request.body;
  const userId = user.userId;
  const userPw = user.userPw;
  const userPwCheck = user.userPwCheck;
  db.query(`select * from user where userId = ?`, [userId], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
      response.write(
        "<script type='text/javascript'>alert('아이디가 존재합니다.')</script>"
      );
      response.write('<script>window.location="/users/join"</script>');
    } else if (!result[0]) {
      if (userPw === userPwCheck) {
        db.query(`INSERT INTO user VALUES (?, ?)`, [userId, userPw], err => {
          if (err) {
            console.log(err);
          }
          response.redirect("/users/login");
        });
      } else {
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.write(
          "<script type='text/javascript'>alert('패스워드를 확인해주세요')</script>"
        );
        response.write('<script>window.location="/users/join"</script>');
      }
    }
  });
});
module.exports = router;
