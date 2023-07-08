const User = require("../models/users");
const { hash } = require("bcrypt");
const nodemailer = require("nodemailer");

const createUser = async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;

    let user = await User.findOne({email: email});
    console.log(user);
    if(user) {
        return res.json({
            success: false,
            message: "This user already exist"
        });
    }

    console.log(username, email, password);
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
    sendMailToUser(email, _id, hashID, res);
    console.log(email);
}

const sendMailToUser = (emailTo, _id, hashID, res) => {

    const url = `http://localhost:5000/verify?hashID=${hashID}`;
    const html = `<p>Please verify your email</p>
        <a href=${url}>${url}</a>
    `;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "junaidali.100190@gmail.com",
            pass: "twbnvtlxlqzpsdbj"
        }
    });

    const mailOptions = {
        from: "junaidali.100190@gmail.com",
        to: emailTo,
        subject: "Verification email",
        html: html
    }

    transporter.sendMail(mailOptions, async (err, info) => {
        if(err) {
            await User.deleteOne({_id: _id});
            return res.json({
                success: false,
                message: "Issue in creating account or email does not exist"
            });
        }

        return res.json({
            success: true,
            message: "Account has been created. Please verify your email"
        });
    });
}

module.exports = { createUser };