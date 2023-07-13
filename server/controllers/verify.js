const User = require("../models/users");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const verify = async (req, res) => {
    const hashID = req.query.hashID;

    const _id = await getMatchingID(hashID);
    
    if(_id) {
        await User.findByIdAndUpdate(_id, {isVerfied: true});
        const token = sign({_id: _id}, process.env.JWT_SECRET);

        return res.json({
            success: true,
            message: "You have successfully verfied your account"
        });
    }

    else {
        return res.json({
            success: false,
            message: "Verification unsuccessful"
        });
    }
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

module.exports = verify;