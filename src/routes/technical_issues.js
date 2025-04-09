import express from "express";
import bodyParser from "body-parser";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth.js";
import { technical_issueCreateSchema, technical_issueUpdateSchema } from "../validators/issueValidator.js";
import  validate  from "../middlewares/validate.js"
import { getAllIssues, getIssueById, createIssue, editIssueById, deleteIssueById } from "../controllers/technical_issues.js";

const app = express();
const route = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

route.get("/", authenticateJWT, authorizeRoles("manager", "customer"), getAllIssues)

route.get("/:id", authenticateJWT, authorizeRoles("manager", "customer"), getIssueById)

route.post("/", authenticateJWT, authorizeRoles("manager", "customer"), validate(technical_issueCreateSchema), createIssue)

route.patch("/:id", authenticateJWT, authorizeRoles("manager", "customer"), validate(technical_issueUpdateSchema), editIssueById)

route.delete("/:id", authenticateJWT, authorizeRoles("manager", "customer"), deleteIssueById)

export default route;


