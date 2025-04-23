import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import { getComplaintsByCategory, getContractExpiringCustomer, getCustomerCountByFloor, 
    getFeedbacksByCategory, getRentedAreaByFloor, getTotalRentedArea } from "../controllers/report.js";

const app = express();
const route = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));

route.get("/customer-by-floor", authenticateJWT, authorizeRoles("manager"), getCustomerCountByFloor);

route.get("/rentedArea-by-floor", authenticateJWT, authorizeRoles("manager"), getRentedAreaByFloor);

route.get("/total-rentedArea", authenticateJWT, authorizeRoles("manager"), getTotalRentedArea);

route.get("/complaints-by-category", authenticateJWT, authorizeRoles("manager"), getComplaintsByCategory);

route.get("/feedbacks-by-category", authenticateJWT, authorizeRoles("manager"), getFeedbacksByCategory);

route.get("/contract-expiring-customer", authenticateJWT, authorizeRoles("manager"), getContractExpiringCustomer);

export default route;