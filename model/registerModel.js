const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");
const userShema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userShema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT, {expiresIn: "1d"});
};

const User = mongoose.model("user", userShema);

const validate = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().passwordComplexity().required().label("First Name"),
    })
    return schema.validate(data)
}

module.exports = {User, validate};