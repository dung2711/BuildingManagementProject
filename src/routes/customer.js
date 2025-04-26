import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import {customerCreateSchema, customerUpdateSchema} from "../validators/customerValidator.js";
import validate from "../middlewares/validate.js"
import { getAllCustomers, getCustomerById, createCustomer, editCustomerById, deleteCustomerById
 } from "../controllers/customer.js";

const app = express();
const route = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("manager", "admin", "customer"), getAllCustomers);

route.get("/:id", authenticateJWT, authorizeRoles("manager", "customer"), getCustomerById);

route.post("/", authenticateJWT, authorizeRoles("manager"), validate(customerCreateSchema), createCustomer);

route.patch("/:id", authenticateJWT, authorizeRoles("manager"), validate(customerUpdateSchema), editCustomerById);

route.delete("/:id", authenticateJWT, authorizeRoles("manager"), deleteCustomerById);

export default route;

