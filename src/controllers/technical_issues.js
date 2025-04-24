import express from "express";
import bodyParser from "body-parser";
import Technical_issue from "../models/Technical_issue.js";
import Customer from "../models/Customer.js";
import { Op } from "sequelize";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllIssues = async (req, res) => {
    try {
        const { name, category,  customer_name, status } = req.query;
        const where = {}
        const user = req.user.dataValues;
        if(user.authentication == "customer"){
            where.customer_id = {[Op.eq]: user.customer_id}
        }
        if (name) {
            where.name = { [Op.eq]: name };
        }
        if (category) {
            where.category = { [Op.eq]: category };
        }
        if(status) {
            where.status = { [Op.eq]: status };
        }
        if (customer_name) {
            const customer_id = (await Customer.findOne({
                attributes: ["id"]
            }, {
                where: {
                    name: customer_name
                }
            })).dataValues.id;
            where.customer_id = { [Op.eq]: customer_id }
        }
        const issue = await Technical_issue.findAll({
            where: where
        });
        if (!issue) {
            return res.status(404).json({ message: "Technical_issue not found" });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch technical_issue",
            error: error
        })
    }
}

export const getIssueById = async (req, res) => {
    try {
        const id = req.params.id;
        const issue = await Technical_issue.findByPk(id);
        if (!issue) {
            return res.status(404).json({ message: "Technical_issue not found" });
        }
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch technical_issue",
            error: error
        })
    }
}

export const createIssue = async (req, res) => {
    try {
        // const { error } = technical_issueCreateSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json(error);
        // }
        console.log(req.body)
        const { name, category, 
            description, customer_name } = req.body;
        const customer_id = (await Customer.findOne({
            where: {
                name: customer_name,
            }
        })).dataValues.id;
        if (!customer_id) {
            return res.status(400).json({ message: "Customer not found" });
        }
        const issue = await Technical_issue.create({
            name: name,
            category: category,
            description: description,
            status: "Đang xử lý",
            customer_id: customer_id
        })
        res.status(200).json(issue.dataValues);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create technical_issue",
            error: error
        })
    }
}

export const editIssueById = async (req, res) => {
    try {
        // const { error } = technical_issueUpdateSchema.validate(req.body);
        // if (error) {
        //     return res.status(400).json(error);
        // }
        const user = req.user.dataValues;
        const id = req.params.id;
        const { name, category, 
            description, status, customer_name } = req.body;
        const customer_id = (await Customer.findOne({
            attributes: ["id"]
        }, {
            where: {
                name: customer_name,
            }
        })).dataValues.id;
        if (!customer_id) {
            return res.status(400).json({ message: "Customer not found" });
        }
        const formerIssue = (await Technical_issue.findByPk(id)).dataValues;
        if(user.customer_id != formerIssue.customer_id && user.authentication == "customer"){
            return res.status(400).json("Permission denied: issue not in possession")
        }
        await Technical_issue.update({
            name: name || formerIssue.name,
            category: category || formerIssue.category,
            description: description || formerIssue.description,
            status: status || formerIssue.status,
            customer_id: customer_id || formerIssue.customer_id
        }, {
            where: {
                id: id
            }
        })
        const issue = await Technical_issue.findByPk(id);
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update technical_issue",
            error: error
        })
    }
}

export const deleteIssueById = async (req, res) => {
    try {
        const user = req.user.dataValues;
        const id = req.params.id;
        const issue = await Technical_issue.findByPk(id);
        if(user.customer_id != issue.customer_id && user.authentication == "customer"){
            return res.status(400).json("Permission denied: issue not in possession")
        }
        await Technical_issue.destroy({
            where: {
                id: id,
            }
        })
        res.status(200).json("Deleted")
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete technical_issue",
            error: error
        })
    }
}