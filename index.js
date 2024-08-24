import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors(
  {
    origin: ["https://bookstore-frontend-rho.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB

mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

   app.get("/", (req, res) => {
    res.json("Hello");
   })

// defining routes

app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});