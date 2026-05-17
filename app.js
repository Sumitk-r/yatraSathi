if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



// DATABASE URL
const dbUrl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });



async function main() {
  await mongoose.connect(dbUrl);
}
// VIEW ENGINE

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));



// MIDDLEWARES

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/uploads", express.static("uploads"));

// SESSION STORE

const store = MongoStore.create({
  mongoUrl: dbUrl,

  crypto: {
    secret: "mysecret",
  },

  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("SESSION STORE ERROR");
});



// SESSION CONFIG

const sessionOptions = {
  store,

  secret: "mysecret",

  resave: false,

  saveUninitialized: true,

  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,

    maxAge: 7 * 24 * 60 * 60 * 1000,

    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use(flash());



// PASSPORT CONFIG

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());



// GLOBAL VARIABLES

app.use((req, res, next) => {

  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  res.locals.currUser = req.user;

  next();
});



// HOME ROUTE

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/test", (req, res) => {

    req.flash("success", "Flash finally works!");

    res.redirect("/listings");
});

// ROUTES

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewRouter);

app.use("/", userRouter);



// 404 HANDLER
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});


// ERROR HANDLER

app.use((err, req, res, next) => {

  let { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).render("listings/error.ejs", { message });
});



// SERVER start

app.listen(8080, () => {
  console.log("App is listening on port 8080");
});

