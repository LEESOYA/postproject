const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../nodejs/myslq");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "/public/uploads/");
  },
  filename: (request, file, cb) => {
    // extname - 확장자 추출 후 출력
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage: storage });
const { createApiError, ErrorCode } = require("./apiError");
const asyncApiRouter = require("./asyncApiRouter");
const { response } = require("express");

/* GET post listing. */

// 게시물 검색
router.post("/post_search", async (request, response) => {
  try {
    const { search } = request.body;
    const [searchResult] = await db.query(
      `select * from mypost where main_text like '%${search}%'`
    );
    response.render("../views/post/post", {
      data: searchResult,
      userId: request.session.account,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/popularity", async (request, response) => {
  try {
    const [data] = await db.query(
      `select * from mypost order by like_cnt desc`
    );
    response.render("../views/post/post", {
      data,
      userId: request.session.account,
    });
  } catch (error) {
    console.error(error);
  }
});

// 좋아요 카운트
router.post(
  "/like/:id",
  asyncApiRouter(async (request, response) => {
    const [data] = await db.query(`select * from mypost where id=?`, [
      request.params.id,
    ]);
    if (!data[0]) {
      throw createApiError(ErrorCode.NOT_EXIST_POST);
    }
    const { like_state, like_cnt } = data[0];

    await db.query(
      `update mypost set like_cnt = ?, like_state = ? where id=?`,
      like_state
        ? [like_cnt - 1, !like_state, request.params.id]
        : [like_cnt + 1, !like_state, request.params.id]
    );
    response.send({ success: true, like_state: !like_state });
  })
);

// 글쓰기
router.get("/postWrite", (request, response, next) => {
  if (request.session.is_loggedIn) {
    response.render("../views/post/postWrite", {
      userId: request.session.account,
    });
  }
});

router.post(
  "/postWrite_process",
  upload.single("thumb_upload"),
  async (request, response) => {
    try {
      const { title, text } = request.body;
      const hashtag = "임시태그";
      const thumbnail = `/uploads/` + request.file.filename;
      await db.query(
        `INSERT INTO mypost (title, userId, hashtag, main_text, image) VALUES (?,?,?,?,?)`,
        [title, request.session.account, hashtag, text, thumbnail]
      );
      response.redirect("../");
    } catch (error) {
      console.error(error);
    }
  }
);

// 상세보기
router.get("/postDetail/:id", async (request, response) => {
  try {
    const [postData] = await db.query("select * from mypost where id = ?", [
      request.params.id,
    ]);
    const { id } = postData[0];
    const [commentData] = await db.query(
      `select * from comment where postId=?`,
      [id]
    );
    const [commentUser] = await db.query(
      `select * from comment join user on (user.userId = comment.userId) where postId=?`,
      [id]
    );
    const userAccount = request.session.account;
    response.render("../views/post/postDetail", {
      postData,
      userId: userAccount === undefined ? "" : request.session.account[0],
      commentUser,
    });
  } catch (error) {
    console.error(error);
  }
});

// 댓글
router.post("/comment/:id", async (request, response) => {
  try {
    const { comment } = request.body;
    const [data] = await db.query("select * from mypost where id = ?", [
      request.params.id,
    ]);
    const { id } = data[0];
    await db.query(
      `INSERT INTO comment (userId, postId, postUserId, comment) VALUES (?,?,?,?)`,
      [request.session.user_id, request.params.id, id, comment]
    );

    response.send({
      success: true,
      userId: request.session.account,
      comment,
    });
  } catch (error) {
    console.error(error);
  }
});

// 댓글 삭제
router.post("/commDelete/:postId/:commId", async (request, response) => {
  try {
    await db.query(`delete from comment where commentId=?`, [
      request.params.commId,
    ]);
    response.redirect("/post/postDetail/" + request.params.postId);
  } catch (error) {
    console.error(error);
  }
});

// 수정
router.get("/postUpdate/:id", async (request, response) => {
  try {
    const [postData] = await db.query(`select * from mypost where id = ?`, [
      request.params.id,
    ]);
    response.render("../views/post/postUpdate", {
      userId: request.session.account,
      postData,
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/update_process/:id", async (request, response) => {
  try {
    const { title, hashtag, text } = request.body;
    await db.query(
      `update mypost set title=?, hashtag=?, userId=?, main_text =?  where id=?`,
      [title, hashtag, request.session.account, text, request.params.id]
    );
    response.redirect("/post/postDetail/" + request.params.id);
  } catch (error) {
    console.error(error);
  }
});

// 삭제
router.post("/delete/:id", async (request, response) => {
  try {
    await db.query(`delete from mypost where id=?`, [request.params.id]);
    response.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

router.get("/uploadImg", (request, response) => {
  response.render("../views/post/uploadFile");
});

router.post(
  "/upload_process",
  upload.single("thumb_upload"),
  async (request, response) => {
    response.send("upload : " + request.file);
    // console.log(request.file);
    // await db.query(`select * from mypost order by id desc;`, (error, data) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   response.render("../views/post/post", {
    //     userId: request.session.account,
    //     fileName: request.file.filename,
    //     data,
    //   });
    // });
  }
);

module.exports = router;
