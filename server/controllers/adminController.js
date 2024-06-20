const mongoose = require("mongoose");
const { Users } = require("../models/userModel");
const { generatePasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken, verifyRefreshToken, generateRefreshToken } = require("../utils/jwt");

const signup = async (req, res) => {
    console.log("signup");
    console.log(req.body);

    const { name, phonenumber, password } = req.body;
    const isExist = await Users.findOne({ phonenumber });
    if (isExist) {
        return res.status(400).json({
            message: "User Already Exist",
        });
    }
    const hashedPassword = await generatePasswordHash(password);
    await Users.create({
        username: name,
        phonenumber: phonenumber,
        password: hashedPassword,
        status: true,
        isAdmin: true,
        total: 0,
    });
    res.json({
        message: "Account has been Created",
    });
};

const login = async (req, res) => {
    console.log("login");
    const { phonenumber, password } = req.body;
    const user = await Users.findOne({ phonenumber: phonenumber, isAdmin: true });
    console.log(user);
    if (!user) {
        return res.status(404).json({
            message: "Username is not valid",
        });
    }
    const validPassword = await comparePasswordHash(password, user.password);
    if (!validPassword) {
        return res.status(404).json({
            message: "Password is not valid",
        });
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("adminRefreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    }).json({ accessToken, user, message: "login successfull" });
};

const dashboard = async (req, res) => {
    try {
        // console.log("get profile");
      let user;
        let alluser = [];

        alluser = await Users.find({ isAdmin: false });
        // alluser = await Users.find();
        user = await Users.findById(req.userId).select("-password");

        res.status(200).json({ alluser ,user});
    } catch (error) {
        console.log(error);
    }
};

const sigletransation = async (req, res) => {
    try {
        console.log("sigletransation");
        console.log(req.params.id);

        let user = [];

        user = await Users.findById(req.params.id).select("-password");

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
};

const userauth = async (req, res) => {
    try {
        let alluser;
        let { id, auth } = req.body;

        console.log(id, auth, "userauth");

        let user = await Users.findByIdAndUpdate({ _id: id });
        console.log(user);
        user.status = auth;
        await user.save();

        alluser = await Users.find();
        res.status(200).json({ alluser });
    } catch (error) {
        console.log(error);
    }
};

const refreshToken = (req, res) => {
    // refresh token
    const userId = verifyRefreshToken(req.cookies.refreshToken);
    if (!userId) {
        return res.status(401).json({ message: "Refresh token is expired" });
    }

    const accessToken = generateAccessToken(userId);

    const refreshToken = generateRefreshToken(userId);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    }).json({ accessToken });
};

// const profile =(req,res)=>{
// }

module.exports = {
    login,
    signup,
    sigletransation,
    userauth,
    dashboard,
    refreshToken,
};
