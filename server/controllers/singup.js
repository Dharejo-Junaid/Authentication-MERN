const User = require("../models/users");
const mailSender = require("mailsender");
const { hash } = require("bcrypt");

const createUser = async (req, res) => {
    const {username, email, password} = req.body;

    let user = await User.findOne({email: email});

    if(user) {
        return res.json({
            success: false,
            message: "This user already exist"
        });
    }

    const hashPass = await hash(password, 10);

    // create user;
    user = new User({
        username: username,
        email: email,
        password: hashPass,
        isVerfied: false
    }) 

    // store user in database
    const dbRes = await user.save();

    // get user id and hash it;
    const _id = dbRes._id.toString();
    const hashID = await hash(_id, 10);
    
    // send mail to user to verify his/her account;
    // sendMail(email, _id, hashID);
    console.log(hashID);
}

const sendMail = (mailTo, _id, hashID) => {
    // TODO: send mail;
}

module.exports = { createUser };