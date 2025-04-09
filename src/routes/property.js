import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import {propertyCreateSchema, propertyUpdateSchema} from "../validators/propertyValidator.js";
import { getAllProperties, getPropertyById, editPropertyById, createProperty, deletePropertyById } from "../controllers/property.js";

const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("manager"), getAllProperties)

route.get("/:id", authenticateJWT, authorizeRoles("manager"), getPropertyById)

route.post("/", authenticateJWT, authorizeRoles("manager"), validate(propertyCreateSchema), createProperty)

route.patch("/:id", authenticateJWT, authorizeRoles("manager"), validate(propertyUpdateSchema), editPropertyById)

route.delete("/:id", authenticateJWT, authorizeRoles("manager"), deletePropertyById)


export default route;