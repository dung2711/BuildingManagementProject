import express from "express";
import bodyParser from "body-parser";
import {db} from "./config/database.js";
import sequelize from "./config/database.js";
import passport from "./config/passport.js";
import session from "express-session";
import env from "dotenv";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import customerRoute from "./routes/customer.js";
import orderRoute from "./routes/order.js";
import propertyRoute from "./routes/property.js";
import technical_issueRoute from "./routes/technical_issues.js";
import complaint_feedbackRoute from "./routes/complaint_feedback.js";


const app = express();
const port = 3000;
env.config();
db.connect();

try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
    await sequelize.sync(); // or { alter: true }
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.json("Success")
})

app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/customer", customerRoute);
app.use("/order", orderRoute);
app.use("/property", propertyRoute);
app.use("/complaint", complaint_feedbackRoute);
app.use("/issue", technical_issueRoute);

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})