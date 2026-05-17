
// const Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// module.exports.index = async (req, res) => {
//     const allListing = await Listing.find({});
//     res.render("listings/index.ejs", { allListing });
// };
// module.exports.renderNewForm = async (req, res) => {
//     res.render("listings/new.ejs");
// };
// module.exports.showListing = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
// };
// module.exports.createListing = async (req, res, next) => {
//     let response = await geocodingClient.forwardGeocode({
//         query: req.body.listing.location,
//         limit: 1,
//     })
//         .send();


//     let url = req.file.path;
//     let filename = req.file.filename;

//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = { url, filename };

//     newListing.geometry = response.body.features[0].geometry;

//     let savedListing = await newListing.save();
//     console.log(savedListing);
//     req.flash("success", "New listing created!");
//     res.redirect("/listings");
// };
// module.exports.renderEditForm = async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if (!listing) {
//         req.flash("error", "Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
//     let originalImageUrl = listing.image.url;
//     originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
//     res.render("listings/edit.ejs", { listing, originalImageUrl });
// };
// module.exports.updateListing = async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//     if (typeof req.file !== "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }

//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
// };
// module.exports.distroyListing = async (req, res) => {
//     let { id } = req.params;
//     const deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", "Listing Deleted");
//     res.redirect("/listings");
// }

const User = require("../models/user");
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Account created! Please login.");
            res.redirect("/login");
        })

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are now logged out!");
        res.redirect("/listings");
    })
};