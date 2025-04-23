import Customer from "../models/Customer.js";
import sequelize from "../config/database.js";
import Complaint_feedback from "../models/Complaint_feedback.js";
import { Op } from "sequelize";

export const getCustomerCountByFloor = async (req, res) => {
    try {
        const result = await Customer.findAll({
            attributes: ["floor", [sequelize.fn("Count", sequelize.col("id")), "Numbers of customers"]],
            group: ["floor"],
            order: [["floor", "ASC"]]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getRentedAreaByFloor = async (req, res) => {
    try {
        const result = await Customer.findAll({
            attributes: ["floor", [sequelize.fn("Sum", sequelize.col("rented_area")), "RentedAreaPerFloor"]],
            group: ["floor"],
            order: [["floor", "ASC"]]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTotalRentedArea = async (req, res) => {
    try {
        const result = await Customer.findAll({
            attributes: [[sequelize.fn("Sum", sequelize.col("rented_area")), "TotalRentedArea"]]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComplaintsByCategory = async (req, res) => {
    try {
        const result = await Complaint_feedback.findAll({
            attributes: ["category", [sequelize.fn("Count", sequelize.col("id")), "Numbers of complaints"]],
            group: ["category"],
            order: [["category", "ASC"]],
            where: {
                types: "complaint",
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getFeedbacksByCategory = async (req, res) => {
    try {
        const result = await Complaint_feedback.findAll({
            attributes: ["category", [sequelize.fn("Count", sequelize.col("id")), "Numbers of feedbacks"]],
            group: ["category"],
            order: [["category", "ASC"]],
            where: {
                types: "feedback",
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getContractExpiringCustomer = async (req, res) => {
    try {
        const date = (new Date()).getTime();
        const result = await Customer.findAll({
            attributes: ["name", "contract_expired_time"],
            where: {
                contract_expired_time: {
                    [Op.lte]: date + 1000*60*60*24*30
                }
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}