import express from "express";
import passport from "../config/passport.js";
import bodyParser from "body-parser";
import { loginLogic, changPasswordLogic } from "../controllers/auth.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import { loginValidator, changePasswordValidator } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js"


const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/login", (req, res) => {
  res.status(400).json("Login route");
})

route.get('/logout', (req, res) => {
  req.logout((err) => {
      if (err) {
          console.log(err);
      }
      res.redirect('/'); 
  });
});

route.post("/login", passport.authenticate("local", {
  failureRedirect: "/login"
}),  loginLogic);


route.patch('/change-password', authenticateJWT, authorizeRoles("customer"), validate(changePasswordValidator), changPasswordLogic);

export default route;