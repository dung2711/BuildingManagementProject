import express from "express";
import passport from "../config/passport.js";
import bodyParser from "body-parser";
import { loginLogic, changPasswordLogic } from "../controllers/auth.js";


const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/login", (req, res) => {
  res.status(400).json("Wrong password or email");
})

route.post("/login", passport.authenticate("local", {
  failureRedirect: "/login"
}), loginLogic);


route.patch('/change-password', passport.authenticate('jwt', { session: false }),
  changPasswordLogic
);
export default route;