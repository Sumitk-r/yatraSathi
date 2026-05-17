
// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync");
// const passport = require("passport");
// const { saveRedirectUrl } = require("../middleware.js");
// const { signup } = require("../controllers/users.js");
// const userController = require("../controllers/users.js");

// router.route("/signup")
//     .get(userController.renderSignupForm)
//     .post(wrapAsync(userController.signup))
// router.route("/login")
//     .get( userController.renderLoginForm )
//     .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);
    
// router.get("/logout", userController.logout);
// module.exports = router;
// console.log("hui");
const express = require("express");

const router = express.Router();

const passport = require("passport");

const User = require("../models/user.js");



// SIGNUP PAGE

router.get("/signup", (req, res) => {

    res.render("users/signup.ejs");
});



// SIGNUP LOGIC

router.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const newUser = new User({
            email,
            username
        });

        await User.register(newUser, password);

        req.flash("success", "Account created! Please login.");

        res.redirect("/login");

    } catch(err) {

        console.log(err);

        req.flash("error", err.message);

        res.redirect("/signup");
    }
});



// LOGIN PAGE

router.get("/login", (req, res) => {

    res.render("users/login.ejs");
});



// LOGIN LOGIC

router.post(
    "/login",

    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),

    async (req, res) => {

        req.flash("success", "Welcome back!");

        res.redirect("/listings");
    }
);



// LOGOUT

router.get("/logout", (req, res, next) => {

    req.logout(function(err) {

        if(err) {
            return next(err);
        }

        req.flash("success", "Logged out!");

        res.redirect("/listings");
    });
});



module.exports = router;