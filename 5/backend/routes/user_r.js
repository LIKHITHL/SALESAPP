const express= require('express');
const router=express.Router();
const mongoose=require('mongoose');
const UserModel =require('../models/user_m');
const jwt = require('jsonwebtoken');
const bcryptjs=require("bcryptjs");
const {JWT_SECRET}= require("../config")


router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName ||!lastName || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userInDB = await UserModel.findOne({ email: email });

    if (userInDB) {
      return res.status(500).json({ error: "User with this email is already registered" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new UserModel({ firstName,lastName, email, password: hashedPassword });
    const newUser = await user.save();

    if (newUser) {
      return res.status(201).json({ result: "User Signed up successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userInDB = await UserModel.findOne({ email: email });

    if (!userInDB) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const didMatch = await bcryptjs.compare(password, userInDB.password);

    if (didMatch) {
      const user = new UserModel({ email, password });
      if (user) {
        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
        const userInfo = { "email": userInDB.email, "fullName": userInDB.fullName };

        return res.status(200).json({ result: { token: jwtToken, user: userInfo, message:"user successfully login" } });
      } else {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports=router;