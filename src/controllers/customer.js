import express from "express";
import bodyParser from "body-parser";
import Customer from "../models/Customer.js";
import { Op } from "sequelize";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllCustomers = async (req, res) => {
    try {
        const {name, floor, expired_from, expired_to, director_name} = req.query
        const where = {};
        if(name){
            where.name = {[Op.iLike] : `%${name}%`};
        }
        if(floor) {
            where.floor = {[Op.eq] : parseInt(floor)}
        }
        if(expired_from || expired_to){
            where.contract_expired_time={}
            if(expired_from){
            where.contract_expired_time[Op.gte] = new Date(expired_from);
        }
        if(expired_to){
            where.contract_expired_time[Op.lte] = new Date(expired_to);
        }
    }
        if(director_name){
            where.director_name = {[Op.iLike] : `%${director_name}%`};
        }
        const customers = await Customer.findAll({
            where: where,
            order: [
                ['id', 'DESC']
            ]
        });
        if (!customers) {
            return res.status(404).json({ message: "Customer not found" });
          }
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch customer",
            error: error
        })
    }
} 

export const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
          }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch customer",
            error: error
        })
    }
}

export const createCustomer = async (req, res) => {
    try {
        // const {error} = customerCreateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const { name, floor, rented_area,
            contract_expired_time, contact_person,
            contact_number, director_name, director_phone_number
        } = req.body;
        const result = await Customer.create({
            name: name,
            floor: parseInt(floor),
            rented_area: parseFloat(rented_area),
            contact_number: contact_number,
            contract_expired_time: contract_expired_time,
            contact_person: contact_person,
            director_name: director_name,
            director_phone_number: director_phone_number
        },);
        res.status(200).json(result.dataValues);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create customer",
            error: error
        })
    }
}

export const editCustomerById = async (req, res) => {
    try {
        // const {error} = customerUpdateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const id = req.params.id;
        const { name, floor, rented_area,
            contract_expired_time, contact_person,
            contact_number, director_name, director_phone_number
        } = req.body;
        const formerCustomer = (await Customer.findByPk(id)).dataValues;
        await Customer.update({
            name: name || formerCustomer.name,
            floor: floor || formerCustomer.floor,
            rented_area: rented_area || formerCustomer.floor,
            contact_number: contact_number || formerCustomer.contact_number,
            contract_expired_time: contract_expired_time || formerCustomer.contract_expired_time,
            contact_person: contact_person || formerCustomer.contact_person,
            director_name: director_name || formerCustomer.director_name,
            director_phone_number: director_phone_number || formerCustomer.director_phone_number
        }, {
            where: {
                id: id,
            }
        })
        const customer = await Customer.findByPk(id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update customer",
            error: error
        })
    }
}

export const deleteCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Customer.destroy({
            where: {
                id: id
            }
        })
        if(result) res.status(200).json("Deleted");
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete customer",
            error: error
        })
    }
}