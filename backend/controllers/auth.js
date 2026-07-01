import mongoose from "mongoose";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup = async(req, res , next)=>{

    try{

        const {name , email , password} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name , email , password: hash,
        });
        res.status(200).json("user created successfully");

    } catch (error) {
        next(createError(500, "Error creating user"));
        // console.error(error);
        // res.status(500).json({ message: "Error creating user" });
    }
}

export const signin = async(req, res , next) =>{
    const {name , password} = req.body;

    try{
        const user = await User.findOne({name});
        if(!user) return next(createError(404, "user not found"));

        const isCorrect = await bcrypt.compareSync(password, user.password);
        if(!isCorrect) return next(createError(400, "wrong password or username"));

        const token = jwt.sign({ id : user._id }, process.env.JWT);
        const { password: pass, ...others } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);

    } catch (error) {
        next(createError(500, "Error finding user"));
    }
}


export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};