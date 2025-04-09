import express from "express";
import bodyParser from "body-parser";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const saltRounds =10;

app.use(bodyParser.urlencoded({ extended: true }));

export const loginLogic = async function(req, res) {
  const email = req.body.email;
  let user = await User.findOne({
    where: {
      email: email,
    }
  })
  let token = jwt.sign({
    id: email,
    role: user.dataValues.authentication
  }, process.env.SECRET_KEY, {expiresIn: "1h"})
  return res.json({
    token,
    role: user.dataValues.authentication
  })
}

export const changPasswordLogic = async function(req, res) {
    try {
    const user = req.user;
    console.log(user);
      const currentPassword = req.body.currentPassword; 
      const newPassword = req.body.newPassword;
        const isMatch = await bcrypt.compare(currentPassword, user.dataValues.password);
        if(isMatch) {
          console.log("ismatch")
          bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              await User.update({
                password: hash
              }, {
                where: {
                  email: user.dataValues.email
                }
              })
              res.json(user.dataValues)
            } 
          });
        } else {
          res.status(400).send("Wrong pass")
        }
      } catch (error) {
        console.log(error);
      }
}