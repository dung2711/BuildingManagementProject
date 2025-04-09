import express from "express";
import bodyParser from "body-parser";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import { Op } from "sequelize";


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllOrders = async (req, res) => {
    try {
        const { order_from, order_to
            , category, floor, lift_required, customer_name } = req.query
        const where = {};
        if(order_from){
            where.order_date[Op.gte] = new Date(order_from);
        }
        if(order_to){
            where.order_date[Op.lte] = new Date(order_to);
        }
        if(category){
            where.category = {[Op.eq]: category}
        }
        if(floor){
            where.floor = {[Op.eq]: floor}
        }
        if(lift_required){
            where.lift_required = {[Op.eq]: lift_required}
        }
        if (customer_name) {
            const customer_id = (await Customer.findOne({
                attributes: ["id"]
            }, {
                where: {
                    name: customer_name
                }
            })).dataValues.id;
            where.customer_id = {[Op.eq]: customer_id}
        }
        const orders = await Order.findAll({
            where: where
        });
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch order",
            error: error
        })
    }
}

export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const customer_name = await Customer.findOne({
            attributes: ["name"]
        }, {
            where: {
                id: order.dataValues.customer_id
            }
        })
        res.status(200).json({
            order: order,
            customer_name: customer_name
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch order",
            error: error
        })
    }
}

export const createOrder = async (req, res) => {
    try {
        // const {error} = orderCreateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const {
            order_date, category, observator, observator_phone_number
            , floor, lift_required, description, customer_name
        } = req.body;
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
        const result = await Order.create({
            order_date: order_date,
            category: category,
            observator: observator,
            observator_phone_number: observator_phone_number,
            floor: floor,
            lift_required: lift_required,
            description: description,
            customer_id: customer_id
        });
        res.status(200).json(result.dataValues);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order",
            error: error
        })
    }
}

export const editOrderById = async (req, res) => {
    try {
        // const {error} = orderUpdateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const id = req.params.id
        const {
            order_date, category, observator, observator_phone_number
            , floor, lift_required, description, customer_name
        } = req.body;
        const customer_id = (await Customer.findOne({
            attributes: ["id"]
        }, {
            where: {
                name: customer_name,
            }
        })).dataValues.id;
        if (!customer_id) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const formerOrder = (await Order.findByPk(id)).dataValues;
        await Order.update({
            order_date: order_date || formerOrder.order_date,
            category: category || formerOrder.category,
            observator: observator || formerOrder.observator,
            observator_phone_number: observator_phone_number || formerOrder.observator_phone_number,
            floor: floor || formerOrder.floor,
            lift_required: lift_required || formerOrder.lift_required,
            description: description || formerOrder.description,
            customer_id: customer_id || formerOrder.customer_id
        }, {
            where: {
                id: id,
            }
        });
        const order = await Order.findByPk(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update order",
            error: error
        })
    }
}

export const deleteOrderById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Order.destroy({
            where: {
                id: id
            }
        });
        if (result) res.status(200).json("Deleted");
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete order",
            error: error
        })
    }
}