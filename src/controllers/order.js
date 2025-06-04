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
            , category, floor, lift_required, customer_name, status } = req.query;
        const where = {};
        const user = req.user.dataValues;
        if(user.authentication == "customer"){
            where.customer_id = {[Op.eq]: user.customer_id};
        }
        if(order_from || order_to) {
            where.order_date={}
            if(order_from){
            where.order_date[Op.gte] = new Date(order_from);
        }
        if(order_to){
            where.order_date[Op.lte] = new Date(order_to);
        }
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
        if(status){
            where.status = {[Op.eq]: status}
        }
        if (customer_name) {
            const customer_id = (await Customer.findOne({
                where: {
                    name: customer_name
                }
            })).dataValues.id;
            where.customer_id = {[Op.eq]: customer_id}
        }
        const orders = await Order.findAll({
            where: where,
            order: [['id', 'DESC']]
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

export const getOrderConflictById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const {order_date, time} = order;
        const date = new Date(order_date);
        const conflicts = await Order.findAll({
            where: {
                [Op.and]: [{
                    order_date: date
                }, {
                    time: time
                },{
                    id: {
                        [Op.ne] : id
                    }
                },
                {
                    status: {
                        [Op.in]: ["Đang xử lý", "Chấp nhận"]
                    }
                }]
            }
        });
        res.status(200).json(conflicts);
    } catch (error) {
        res.status(500).json({
            message: "Failed",
            error: error
        })
    }
}


export const getBookedSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    console.log("Fetching booked slots for date:", date);

    const slots = await Order.findAll({
      attributes: ['time'],
      where: {
        order_date: new Date(date), // Chuyển đổi chuỗi ngày thành đối tượng Date
        status: {
          [Op.in]: ['Đang xử lý', 'Chấp nhận'], // chỉ lấy các lịch còn hiệu lực
        },
      },
    });

    const result = slots.map(s => s.time);
    res.status(200).json(result);
  } catch (error) {
    console.log("BookedSlots error:", error);
    res.status(500).json({
      message: "Failed to fetch booked slots",
      error: error.message
    });
  }
};



export const createOrder = async (req, res) => {
    try {
        // const {error} = orderCreateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const {
            order_date, time, category, observator, observator_phone_number
            , floor, lift_required, description, customer_name
        } = req.body;
        let customer_id = req.user.dataValues.customer_id;
        if(customer_name){
            customer_id = (await Customer.findOne( {
            where: {
                name: customer_name,
            }
        })).dataValues.id;
        console.log(customer_id)
    }
        if (!customer_id) {
            return res.status(400).json({ message: "Customer not found" });
        }
        const result = await Order.create({
            order_date: order_date,
            time: time,
            category: category,
            observator: observator,
            observator_phone_number: observator_phone_number,
            floor: floor,
            lift_required: lift_required,
            description: description,
            status: "Đang xử lý",
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
        const user = req.user.dataValues;
        const id = req.params.id;
        const formerOrder = (await Order.findByPk(id)).dataValues;
        console.log(formerOrder);
        const {
            order_date, time, category, observator, observator_phone_number
            , floor, lift_required, description, status, customer_name
        } = req.body;
        let customer_id;
        if(customer_name){
        customer_id = (await Customer.findOne({
            where: {
                name: customer_name,
            }
        })).dataValues.id;
    }
    console.log(customer_id)
        if(user.customer_id != formerOrder.customer_id && user.authentication == "customer"){
            return res.status(400).json("Permission denied: order not in possession")
        }
        await Order.update({
            order_date: order_date || formerOrder.order_date,
            time: time || formerOrder.time,
            category: category || formerOrder.category,
            observator: observator || formerOrder.observator,
            observator_phone_number: observator_phone_number || formerOrder.observator_phone_number,
            floor: floor || formerOrder.floor,
            lift_required: lift_required || formerOrder.lift_required,
            description: description || formerOrder.description,
            status: status || formerOrder.status,
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
        const user = req.user.dataValues;
        const id = req.params.id;
        const order = (await Order.findByPk(id)).dataValues;
        if(user.customer_id != order.customer_id && user.authentication == "customer"){
            return res.status(400).json("Permission denied: order not in possession")
        }
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