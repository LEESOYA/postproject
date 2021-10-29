const express = require("express");
const router = express.Router();
const db = require("../nodejs/myslq");
// db.connect();
db.getConnection();

/* GET home page. */
router.get("/", async (request, response, next) => {
  const [rows] = await db.query(`select * from mypost`);
  response.json({ rows });
});

router.get("/flash", (request, response, next) => {
  request.session.message = "세션메시지";
  request.flash("messaga", "flash테스트");
  response.redirect("/flash/result");
});
router.get("/flash/result", function (req, res) {
  res.send(`${req.session.message} ${req.flash("messaga")}`);
});

module.exports = router;
