
// const express = require("express");
// const router = express.Router();
// const Listing = require("../models/listing");
// router.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   console.log(allListings);
  
//   res.render("listings/index.ejs", { allListings });
// });

//  //New Route
//  router.get("/listings/new", (req, res) => {
//    res.render("listings/new.ejs");
//  });

// // //Show Route
// router.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });

// // //Create Route
// router.post("/listings", async (req, res) => {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// });

// // //Edit Route
// router.get("/listings/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   // res.redirect("/listings");
//   res.render("listings/edit.ejs", { listing });
// });

// // //Update Route
// router.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
//  // res.redirect("/listings");
// });

//  //Delete Route
// router.delete("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });
// console.log("ji");

// module.exports = router;
const express = require("express");

const router = express.Router();

const Listing = require("../models/listing");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });


// INDEX ROUTE

router.get("/", async (req, res) => {

  const allListings = await Listing.find({});

  console.log(allListings);

  res.render("listings/index.ejs", { allListings });
});



// NEW ROUTE

router.get("/new", (req, res) => {

  res.render("listings/new.ejs");
});



// SHOW ROUTE

// router.get("/:id", async (req, res) => {

//   let { id } = req.params;

//   const listing = await Listing.findById(id);

//   res.render("listings/show.ejs", { listing });
// });
router.get("/:id", async (req, res) => {

  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  res.render("listings/show.ejs", { listing });
});



// CREATE ROUTE

// router.post("/", async (req, res) => {
//   console.log(req.body);
//   const newListing = new Listing(req.body.listing);

//   await newListing.save();

//   res.redirect("/listings");
// });

//console.log("de");
router.post("/", upload.single("listing[image]"), async (req, res) => {

  console.log(req.body);

  console.log(req.file);

  const newListing = new Listing(req.body.listing);

  if(req.file) {

    newListing.image = {
      filename: req.file.filename,
      url: "/uploads/" + req.file.filename,
    };
  }

  await newListing.save();

  res.redirect("/listings");
});

// EDIT ROUTE

router.get("/:id/edit", async (req, res) => {

  let { id } = req.params;

  const listing = await Listing.findById(id);

  res.render("listings/edit.ejs", { listing });
});



// UPDATE ROUTE

router.put("/:id", async (req, res) => {

  let { id } = req.params;

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listings/${id}`);
});



// DELETE ROUTE

router.delete("/:id", async (req, res) => {

  let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  res.redirect("/listings");
});



module.exports = router;