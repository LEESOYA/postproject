const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

/* GET post listing. */

// 좋아요 카운트
router.post("/like/:id", (request, response, next) => {
  like_check = () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from mypost where id=?`,
        [request.params.id],
        (error, result) => {
          if (error) {
            reject(new Error("sql error"));
          }
          if (!result[0]) {
            reject(new Error("not exist post!"));
          }
          resolve({
            likeState: result[0].like_state,
            likeCnt: result[0].like_cnt,
          });
        }
      );
    });
  };

  like_change = result => {
    return new Promise((resolve, reject) => {
      db.query(
        `update mypost set like_cnt = ?, like_state = ? where id=?`,
        result.likeState
          ? [result.likeCnt - 1, !result.likeState, request.params.id]
          : [result.likeCnt + 1, !result.likeState, request.params.id],
        error => {
          if (error) {
            reject(new Error("sql error"));
          }
        }
      );
      resolve(result.likeState);
    });
  };
  like_check()
    .then(result => like_change(result))
    .then(result => response.send({ success: true, like_state: !result }))
    .catch(console.log);
});

// 글쓰기
router.get("/postWrite", (request, response, next) => {
  if (request.session.is_logined) {
    response.render("../views/post/postWrite", {
      userId: request.session.user_id,
    });
  }
});

router.post("/postWrite_process", (request, response) => {
  const post = request.body;
  const title = post.title;
  const hashtag = post.hashtag;
  const main_text = post.text;

  db.query(
    `INSERT INTO mypost (title, writer, hashtag, main_text) VALUES (?,?,?,?)`,
    [title, request.session.user_id, hashtag, main_text],
    err2 => {
      if (err2) {
        console.log(err2);
      }
    }
  );
  response.redirect("../");
});

// 상세보기
router.get("/postDetail/:id", (request, response, next) => {
  db.query(
    "select * from mypost where id = ?",
    [request.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      const { id } = result[0];
      // 댓글 리스트
      db.query(
        `select * from comment where postId=? order by time desc `,
        [id],
        (err, result2) => {
          if (err) {
            console.log(err);
          }
          if (request.session.is_logined) {
            response.render("../views/post/postDetail", {
              result,
              userId: request.session.user_id,
              commentList: result2,
            });
          } else if (
            request.session.is_logined === undefined &&
            request.session.user_id === undefined
          ) {
            response.render("../views/post/postDetail", {
              result,
              userId: undefined,
              commentList: result2,
            });
          }
        }
      );
    }
  );
});

// 댓글
router.post("/comment/:id", (request, response) => {
  const { comment } = request.body;
  const userId = request.session.user_id;
  db.query(
    "select * from mypost where id = ?",
    [request.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      const { id, writer } = result[0];
      db.query(
        `INSERT INTO comment (userId, postId, postUserId, comment) VALUES (?,?,?,?)`,
        [request.session.user_id, id, writer, comment],
        err2 => {
          if (err2) {
            console.log(err2);
          }
        }
      );
    }
  );
  response.send({ success: true, userId, comment });
});

// 수정
router.get("/postUpdate/:id", (request, response, next) => {
  post_update = () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from mypost where id = ?`,
        [request.params.id],
        (error, result) => {
          if (error) {
            reject(new Error("sql error"));
          }
          resolve(result);
        }
      );
    });
  };
  post_update().then(result => {
    if (request.session.is_logined) {
      response.render("../views/post/postUpdate", {
        userId: request.session.user_id,
        result,
      });
    }
  });
});

router.post("/update_process/:id", (request, response, next) => {
  const post = request.body;
  const title = post.title;
  const hashtag = post.hashtag;
  const main_text = post.text;

  db.query(
    `update mypost set title=?, hashtag=?, writer=?, main_text =?  where id=?`,
    [title, hashtag, request.session.user_id, main_text, request.params.id],
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
  response.redirect("/post/postDetail/" + request.params.id);
});

// 삭제
router.post("/delete/:id", (request, response, next) => {
  db.query(`delete from mypost where id=?`, [request.params.id], err => {
    if (err) {
      console.log(err);
    }
  });
  response.redirect("/");
});

// router.get("/uploadImg", (request, response) => {
//   response.render("../views/post/uploadFile");
// });

// router.post(
//   "/upload_process",
//   upload.single("uploadImg"),
//   (request, response) => {
//     db.query(`select * from mypost order by id desc;`, (error, data) => {
//       if (error) {
//         console.log(error);
//       }
//       response.render("../views/post/post", {
//         userId: request.session.user_id,
//         fileName: request.file.filename,
//         data,
//       });
//     });
//   }
// );
module.exports = router;
