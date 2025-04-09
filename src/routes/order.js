import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import {orderCreateSchema, orderUpdateSchema} from "../validators/orderValidator.js";
import validate from "../middlewares/validate.js"
import { getAllOrders, getOrderById, createOrder, editOrderById, deleteOrderById } from "../controllers/order.js";

const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("manager", "customer"), getAllOrders);

route.get("/:id", authenticateJWT, authorizeRoles("manager", "customer"), getOrderById);

route.post("/", authenticateJWT, authorizeRoles("manager", "customer"), validate(orderCreateSchema), createOrder);

route.patch("/:id", authenticateJWT, authorizeRoles("manager", "customer"), validate(orderUpdateSchema), editOrderById);

route.delete("/:id", authenticateJWT, authorizeRoles("manager", "customer"), deleteOrderById);

export default route;