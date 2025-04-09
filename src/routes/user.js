import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import  validate  from "../middlewares/validate.js";
import { userCreateSchema, userUpdateSchema } from "../validators/userValidator.js";
import {getAllUsers, getUserById, createUser, editUserById, deleteUserById} from "../controllers/user.js"


const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("admin"), getAllUsers)

route.get("/:id", authenticateJWT, authorizeRoles("admin"), getUserById)

route.post("/", authenticateJWT, authorizeRoles("admin"), validate(userCreateSchema), createUser);

route.patch("/:id", authenticateJWT, validate(userUpdateSchema), editUserById);

route.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteUserById);

export default route;