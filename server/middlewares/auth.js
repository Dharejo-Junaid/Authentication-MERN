const { verify } = require("jsonwebtoken");
const User = require("../models/users");
const { compare } = require("bcrypt");

const auth = async (req, res, next) => {

    const { token } = req.body;
    if(! token) return next();

    const { hashID } = verify(token, process.env.JWT_SECRET);
    if(! hashID) return next();

    const _id = await getMatchingID(hashID);
    if(! _id) return next();

    const user = await User.findById(_id);
    if(user.isVerfied) {
        return res.json({
            success: true,
            message: "Successfully login",
            token: token
        });
    }

    next();
}

const getMatchingID = async (hashID) => {
    const _ids = await User.find({}, {_id: true});

    for(let idObj of _ids) {
        let _id = idObj._id.toString();
        if( await compare(_id, hashID) ) {
            return _id;   
        }
    }
}

module.exports = auth;