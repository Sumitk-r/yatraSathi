
// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const Listing = require("../models/listing.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
// const reviewController = require("../controllers/reviews.js");
// const review = require("../models/review.js");
// router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
// // Delete review Route
// router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));
// module.exports = router;
const express = require("express");

const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");

const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync");



// CREATE REVIEW ROUTE

router.post(
    "/",

    wrapAsync(async (req, res) => {

        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);

        if (req.user) {
            newReview.author = req.user._id;
        }

        listing.reviews.push(newReview);

        await newReview.save();

        await listing.save();

        res.redirect(`/listings/${listing._id}`);
    })
);



// DELETE REVIEW ROUTE

router.delete(
    "/:reviewId",

    wrapAsync(async (req, res) => {

        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, {
            $pull: { reviews: reviewId },
        });

        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`);
    })
);



module.exports = router;