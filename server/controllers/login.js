const { compare, hash } = require("bcrypt");
const User = require("../models/users");
const { sign } = require("jsonwebtoken");

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    let user = await User.findOne({email: email});
    
    // if user not exist;
    if(!user) {
        return res.json({
            success: false,
            message: "user do not exist",
        });
    }

    if(! user.isVerfied) {
        return res.json({
            success: false,
            message: "Please verify your email"
        });
    }

    if(await compare(password, user.password)) {

        const hashID = await hash(user._id.toString(), 10);
        const token = sign({hashID: hashID}, process.env.JWT_SECRET);

        console.log(hashID, token);

        return res.json({
            success: true,
            message: "Login sucessful",
            token: token
        });
    }

    return res.json({
        success: false,
        message: "Wrong password"
    });
}

module.exports = { userLogin };