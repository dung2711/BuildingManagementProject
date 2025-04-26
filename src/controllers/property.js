import express from "express";
import bodyParser from "body-parser";
import Property from "../models/Property.js"


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

export const getAllProperties = async (req, res) => {
    try {
        const {name, category} = req.query;
                const where = {}
                if(name){
                    where.name = {[Op.eq]: name};
                }
                if(category){
                    where.category = {[Op.eq]: category};
                }

        const properties = await Property.findAll({
            where: where,
            order: [

                ['id', 'DESC']
            ]
        });
        if(!properties){
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch property",
            error: error
        })
    }
}

export const getPropertyById = async (req, res) => {
    try {
        const id = req.params.id;
        const property = await Property.findByPk(id);
        if(!property){
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch property",
            error: error
        })
    }
}

export const createProperty = async (req, res) => {
    try {
        // const {error} = propertyCreateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const {name, category, 
            description, numbers} = req.body;
        const result = await Property.create({
            name: name,
            category: category,
            description: description,
            numbers: numbers
        })
        res.status(200).json(result.dataValues);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create order",
            error: error
        })
    }
}

export const editPropertyById = async (req, res) => {
    try {
        // const {error} = propertyUpdateSchema.validate(req.body);
        // if(error){
        //     return res.status(400).json(error);
        // }
        const id = req.params.id;
        const {name, category, 
            description, numbers} = req.body;
        const formerProperty = (await Property.findByPk(id)).dataValues;
        await Property.update({
            name: name || formerProperty.name,
            category: category || formerProperty.category,
            description: description || formerProperty.description,
            numbers: numbers || formerProperty.numbers
        }, {
            where: {
                id: id
            }
        })
        const property = await Property.findByPk(id);
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update order",
            error: error
        })
    }
}

export const deletePropertyById = async (req, res) => {
    try {
        const id = req.params.id;
        await Property.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json("Deleted");
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete order",
            error: error
        })
    }
}