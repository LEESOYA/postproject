const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const usersRouter = require("./routes/users");

const { ApiError } = require("./routes/apiError");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "postproject",
    }),
  })
);
app.use(flash());
app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/users", usersRouter);

app.use("/uploads", express.static("/public/uploads"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code.httpStatus);
    res.send({
      code: err.code.code,
      message: err.code.message,
      detail: err.detail,
    });
    return;
  }

  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
