//require("dotenv").config();

// const mongoose = require("mongoose");

// const initData = require("./data.js");

// const Listing = require("../models/listing.js");

// const dbUrl = process.env.ATLASDB_URL;

// mongoose.connect(dbUrl)
// .then(() => {
//     console.log("DB Connected");
// })
// .catch((err) => {
//     console.log(err);
// });
// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// console.log("hello");

// console.log("hi");

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//    try {
//     await mongoose.connect(MONGO_URL);
//     console.log("connected to DB");

//     await initDB();
//     mongoose.connection.close();
//   } catch (err) {
//     console.log(err);
//   }

// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };
// console.log(initData.data);


// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// main().then(() => {
//     console.log("Connected to DB");
// })
//     .catch(err => console.log(err));

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({ ...obj, owner: '668ab48bf296e94cfb2071cd' }));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initiallised");
// }
// initDB();
// require("dotenv").config();

// const mongoose = require("mongoose");

// const initData = require("./data.js");

// const Listing = require("../models/listing.js");

// const dbUrl = process.env.ATLASDB_URL;



// async function main() {

//     await mongoose.connect(dbUrl);
// }

// main()
// .then(() => {
//     console.log("Connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });



// const initDB = async () => {

//     await Listing.deleteMany({});

//     initData.data = initData.data.map((obj) => ({
//         ...obj,
//         owner: "668ab48bf296e94cfb2071cd"
//     }));

//     await Listing.insertMany(initData.data);

//     console.log("Data was initialized");
// };
// // console.log(process.env.ATLASDB_URL);
// // // initDB();
// // const mongoose = require("mongoose");

// // const initData = require("./data.js");

// // const Listing = require("../models/listing.js");

// // const dbUrl = "mongodb+srv://sumitdear:uiop900@cluster0.8xk0lpe.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";



// async function main() {

//     await mongoose.connect(dbUrl);
// }

// main()
// .then(() => {
//     console.log("Connected to DB");
// })
// .catch((err) => {
//     console.log(err);
// });



// const initDB = async () => {

//     await Listing.deleteMany({});

//     initData.data = initData.data.map((obj) => ({
//         ...obj,
//         owner: "668ab48bf296e94cfb2071cd"
//     }));

//     await Listing.insertMany(initData.data);

//     console.log("Data was initialized");
// };

// // const mongoose = require("mongoose");

// // const initData = require("./data.js");

// // const Listing = require("../models/listing.js");

// // const dbUrl = "mongodb+srv://gurmit:gurmit123@cluster0.8xk0lpe.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";



// // async function main() {

// //     await mongoose.connect(dbUrl);

// //     console.log("Connected to DB");

// //     await initDB();
// // }



// // const initDB = async () => {

// //     await Listing.deleteMany({});

// //     initData.data = initData.data.map((obj) => ({
// //         ...obj,
// //         owner: "668ab48bf296e94cfb2071cd"
// //     }));

// //     await Listing.insertMany(initData.data);

//     console.log("Data was initialized");
// };



// main()
// .catch((err) => {
//     console.log(err);
// });

const mongoose = require("mongoose");

const initData = require("./data.js");

const Listing = require("../models/listing.js");



// Paste your FULL Atlas URL below
const dbUrl = process.env.ATLASDB_URL;
async function main() {

    await mongoose.connect(dbUrl);

    console.log("Connected to DB");

    await initDB();
}



const initDB = async () => {

    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,

        owner: "668ab48bf296e94cfb2071cd"
    }));

    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
};



main()
.catch((err) => {
    console.log(err);
});
