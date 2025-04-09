import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import {complaint_feedbackCreateValidator, complaint_feedbackUpdateValidator} from "../validators/complaint_feedbackValidator.js";
import validate from "../middlewares/validate.js"
import {
    getAllComplaintFeedback, getComplaintFeedbackById,
    createComplaintFeedback, editComplaintFeedbackById, deleteComplaintFeedbackById
} from "../controllers/complaint_feedback.js";

const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("manager", "customer"), getAllComplaintFeedback)

route.get("/:id", authenticateJWT, authorizeRoles("manager", "customer"), getComplaintFeedbackById)

route.post("/", authenticateJWT, authorizeRoles("manager", "customer"), validate(complaint_feedbackCreateValidator), createComplaintFeedback)

route.patch("/:id", authenticateJWT, authorizeRoles("manager", "customer"), validate(complaint_feedbackUpdateValidator), editComplaintFeedbackById)

route.delete("/:id", authenticateJWT, authorizeRoles("manager", "customer"), deleteComplaintFeedbackById)

export default route;


