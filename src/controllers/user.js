import express from "express";
import bodyParser from "body-parser";
import User from "../models/User.js";
import Customer from "../models/Customer.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

const app = express();
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllUsers = async (req, res) => {
    try {
        const { authentication, name, identification,
            customer_name } = req.query;
        const where = {};
        if (authentication) {
            where.authentication = { [Op.eq]: authentication }
        }
        if (name) {
            where.name = { [Op.iLike]: `%${name}%` }
        }
        if (identification) {
            where.identification = { [Op.eq]: identification }
        }
        if (customer_name) {
            const customer_id = (await Customer.findOne({
                where: {
                    name: customer_name
                }
            })).dataValues.id;
            where.customer_id = { [Op.eq]: customer_id };
        }
        const users = await User.findAll({
            where: where,
            order: [['email', 'DESC']]
        });
        if (!users) return res.status(404).json({ message: "User not found" });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {
                email: id
            }
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const { email, password, authentication,
            name, phone_number, identification, customer_name } = req.body;
        let customer_id = null;
        if (customer_name) {
            try {
                customer_id = (await Customer.findOne({
                    where: {
                        name: customer_name
                    }
                })).dataValues.id;
                if (!customer_id) {
                    res.status(400).json("Customer not found");
                }
            } catch (error) {
                console.log(error)
            }
        }
        const checkResult = await User.findOne({
            where: {
                email: email,
            }
        })
        if (checkResult) {
            res.status(400).json({
                message: "Email already exists",
                account: checkResult.dataValues
            });
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            console.log("Before create");
            const newUser = await User.create({
                email: email,
                password: hash,
                authentication: authentication,
                name: name,
                phone_number: phone_number,
                identification: identification,
                customer_id: customer_id
            })
            console.log("After create");
            return res.status(201).json({
                message: "User created successfully",
                user: newUser})
        }
        
    }    
     catch (error) {
            res.status(500).json({
                message: "Failed to create user",
                error: error
            });
        }
    }

export const editUserById = async (req, res) => {
        try {
            // const { error } = userUpdateSchema.validate(req.body);
            // if (error) {
            //     return res.status(400).json(error);
            // }
            const id = req.params.id;
            const name = req.body.name;
            const phone_number = req.body.phone_number;
            const authentication = req.body.authentication;
            const identification = req.body.identification;
            const customer_name = req.body.customer_name;
            let customer_id = null;
            if (customer_name) {
                try {
                    customer_id = (await Customer.findOne({
                        where: {
                            name: customer_name
                        }
                    })).dataValues.id;
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(customer_id)
            const formerUser = await User.findByPk(id);
            await User.update({
                name: name || formerUser.name,
                phone_number: phone_number || formerUser.phone_number,
                identification: identification || formerUser.identification,
                customer_id: customer_id || formerUser.customer_id,
                authentication: authentication || formerUser.authentication,
            }, {
                where: {
                    email: id
                }
            });
            const user = await User.findOne({
                where: {
                    email: id
                }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Failed to update user",
                error: error
            });
        }
    }

    export const deleteUserById = async (req, res) => {
        try {
            const id = req.params.id;
            await User.destroy({
                where: {
                    email: id
                }
            })
            res.status(200).json("Deleted");
        } catch (error) {
            res.status(500).json({
                message: "Failed to fetch user",
                error: error
            });
        }
    }