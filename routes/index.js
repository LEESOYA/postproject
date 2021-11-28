const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");
// db.connect();
db.getConnection();

/* GET home page. */
router.get("/", async (request, response) => {
  const [data] = await db.query(`select * from mypost order by id desc`);
  const [comment] = await db.query(
    `select comment.postId, count(comment) as commentCount
    from mypost join comment
    on mypost.id = comment.postId group by comment.postId`
  );

  for (i = 0; i < data.length; i++) {
    data[i].commentCount = 0;
    for (j = 0; j < comment.length; j++) {
      if (data[i].id === comment[j].postId) {
        data[i].commentCount = comment[j].commentCount;
      }
    }
  }
  if (request.session.is_loggedIn) {
    response.render("../views/post/post", {
      data,
      userId: request.session.account,
      // sql,
    });
  } else if (
    request.session.is_logined === undefined &&
    request.session.account === undefined
  ) {
    response.render("../views/post/post", {
      data,
      userId: undefined,
    });
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

router.get("/recent", async (request, response) => {
  try {
    const [data] = await db.query(`select * from mypost order by id desc`);
    response.render("../views/post/post", {
      data,
      userId: request.session.account,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
