const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");

// 로그인
router.get("/login", (request, response) => {
  // request.flash("NO_EXIST_USER", "사용자 정보가 없습니다.");
  response.render("../views/user/userLogin", {
    userId: request.session.account,
  });
});

router.post("/login_process", async (request, response) => {
  const SESSION = request.session;
  try {
    const { userId, userPw } = request.body;
    const [data] = await db.query(
      `select * from user where account = ? and  password = ?`,
      [userId, userPw]
    );
    // const [pw] = await db.query(`select password from user where account = ?`, [
    //   userId,
    // ]);

    if (data[0]) {
      SESSION.is_loggedIn = true;
      SESSION.account = [data[0].account];
      SESSION.user_id = [data[0].userId];

      response.redirect("../");
    } else if (!data[0]) {
      SESSION.is_loggedIn = false;
      response.render("../views/user/userLogin", {
        // failureMessage: request.flash("NO_EXIST_USER").toString(),
        userId: request.session.account,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/pwdFind", (request, response) => {
  response.render("../views/user/pwdFind", {
    userId: request.session.account,
  });
});

router.post("/pwdFind_process", async (request, response) => {
  try {
    const { userId } = request.body;
    const [data] = await db.query(`select * from user where account = ?`, [
      userId,
    ]);
    // 비밀번호 알려주는 창 만들기 ---> 로그인 페이지로 이동
    response.send(data[0].userPassword);
  } catch (error) {
    console.error(error);
  }
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
  response.render("../views/user/userJoin", {
    userId: request.session.account,
  });
});

router.post("/join_process", async (request, response) => {
  try {
    const { userId, userPw, userPwCheck } = request.body;
    const [data] = await db.query(`select * from user where account = ?`, [
      userId,
    ]);
    if (data[0]) {
      // 실패 메시지 띄워주기
      response.redirect("./join");
    } else if (!data[0]) {
      if (userPw === userPwCheck) {
        const [data2] = await db.query(
          `INSERT INTO user(account, password) VALUES (?, ?)`,
          [userId, userPw]
        );
        response.redirect("/users/login");
      }
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
