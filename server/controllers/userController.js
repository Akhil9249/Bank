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
        isAdmin: false,
        accountnumber: generate(),
        total: 0,
    });
    res.json({
        message: "Account has been Created",
    });
};

const login = async (req, res) => {
    console.log("login");
    const { phonenumber, password } = req.body;
    const user = await Users.findOne({ phonenumber: phonenumber });
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

    res.cookie("userRefreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    }).json({ accessToken, user, message: "login successfull" });
};

const dashboard = async (req, res) => {
    try {
        // console.log("get profile");

        let user = [];
        let alluser = [];

        user = await Users.findById(req.userId).select("-password");

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
};

const deposit = async (req, res) => {
    try {
        console.log("deposit");
        console.log(req.body);
        let user = [];
        let Balanceamount;
        const { name, accountnumber, amount } = req.body;

        let amountNum = parseInt(amount, 10);

        user = await Users.findByIdAndUpdate(req.userId);

        Balanceamount = await Users.findById(req.userId).select("");
        Balanceamount = user.total + amountNum;
        let value = await user.transaction.push({ name, accountnumber, status: "deposit", amount, balance: Balanceamount });
        user.total = Balanceamount;
        await user.save();

        return res.status(200).json({
            message: "Transation successfull",
        });
    } catch (error) {
        console.log(error);
    }
};

const withdrawal = async (req, res) => {
    try {
        console.log("withdrew");
        console.log(req.body);
        let user = [];
        let Balanceamount;
        const { name, accountnumber, amount } = req.body;

        let amountNum = parseInt(amount, 10);

        user = await Users.findByIdAndUpdate(req.userId);

        Balanceamount = await Users.findById(req.userId).select("");
        Balanceamount = user.total - amountNum;
        let value = await user.transaction.push({
            name,
            accountnumber,
            status: "withdrew",
            amount,
            balance: Balanceamount,
        });
        user.total = Balanceamount;
        await user.save();

        return res.status(200).json({
            message: "Transation successfull",
        });
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




const generate = (req, res) => {
    const randomNum = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111);
    return randomNum;
};



module.exports = {
    login,
    signup,
    deposit,
    withdrawal,
    dashboard,
    refreshToken,

};
