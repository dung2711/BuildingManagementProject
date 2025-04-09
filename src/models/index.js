import User from "./User.js";
import Order from "./Order.js";
import Complaint_feedback from "./Complaint_feedback.js";
import Customer from "./Customer.js";
import sequelize from "../config/database.js";
import Technical_issue from "./Technical_issue.js";

Customer.hasMany(User, {
    foreignKey: "customer_id",
});
User.belongsTo(Customer, {
    foreignKey: "customer_id",
});

Customer.hasMany(Order, {
    foreignKey: "customer_id",
})

Order.belongsTo(Customer, {
    foreignKey: "customer_id"
});

User.hasMany(Complaint_feedback, {
    foreignKey: "user_id"
});

Complaint_feedback.belongsTo(User, {
    foreignKey: "user_id"
});

Technical_issue.belongsTo(Customer, {

});

export { sequelize, User, Complaint_feedback, Customer, Order };