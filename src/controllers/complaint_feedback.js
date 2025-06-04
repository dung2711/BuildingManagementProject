import express from "express";
import bodyParser from "body-parser";
import Complaint_feedback from "../models/Complaint_feedback.js";
import { Op } from "sequelize";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllComplaintFeedback = async (req, res) => {
    try {
        const {types, category} = req.query;
        const where = {};
        const user = req.user.dataValues;
        if(user.authentication == "customer"){
            where.user_id = {[Op.eq]: user.email}
        }
        if(types){
            where.types = {[Op.eq]: types}
        }
        if(category){
            where.category = {[Op.eq]: category}
        }
        const complaint_feedback = await Complaint_feedback.findAll({
            where: where,
            order: [['id', 'DESC']]
        });
        if (!complaint_feedback) {
            return res.status(404).json({ message: "Complaint_feedback not found" });
        }
        res.status(200).json(complaint_feedback);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch complaint_feedback",
            error: error
        })
    }
}

export const getComplaintFeedbackById = async (req, res) => {
    try {
        const id = req.params.id;
        const complaint_feedback = await Complaint_feedback.findByPk(id);
        if (!complaint_feedback) {
            return res.status(404).json({ message: "Complaint_feedback not found" });
        }
        res.status(200).json(complaint_feedback);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch complaint_feedback",
            error: error
        })
    }
}

export const createComplaintFeedback = async (req, res) => {
    try {
        // const {error} = complaint_feedbackCreateValidator.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const { types, category,
            description } = req.body;
        const user_id = req.user.dataValues.email;
        console.log(user_id);
        const complaint_feedback = await Complaint_feedback.create({
            types: types,
            category: category,
            description: description,
            user_id: user_id
        })
        res.status(200).json(complaint_feedback);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create complaint_feedback",
            error: error
        })
    }
}

export const editComplaintFeedbackById = async (req, res) => {
    try {
        // const {error} = complaint_feedbackUpdateValidator.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const user = req.user.dataValues;
        const id = req.params.id;
        const { types, category,
            description} = req.body;
        const user_id = req.user.dataValues.email;
        const former = (await Complaint_feedback.findByPk(id)).dataValues;
        if(user.email != former.user_id  && user.authentication !== "manager"){
            return res.status(400).json("Permission denied: complaint_feedback not in possession")
        }
        await Complaint_feedback.update({
            types: types || former.types,
            category: category || former.category,
            description: description || former.description,
            user_id: user_id || former.user_id
        }, {
            where: {
                id: id
            }
        })
        const complaint_feedback = await Complaint_feedback.findByPk(id);
        
        res.status(200).json(complaint_feedback);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update complaint_feedback",
            error: error
        })
    }
}

export const deleteComplaintFeedbackById = async (req, res) => {
    try {
        const user = req.user.dataValues;
        const id = req.params.id;
        const complaint_feedback = await Complaint_feedback.findByPk(id);
        if(user.email != complaint_feedback.user_id && user.authentication !== "manager"){
            return res.status(400).json("Permission denied: complaint_feedback not in possession")
        }
        await Complaint_feedback.destroy({
            where: {
                id: id,
            }
        })
        res.status(200).json("Deleted")
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete complaint_feedback",
            error: error
        })
    }
}