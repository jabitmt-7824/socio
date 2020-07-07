const jwt = require("jsonwebtoken");
const User = require("../../../models/user");

module.exports.signinUser = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: "invalid username or password"
            });
        }
        return res.status(200).json({
            message: "signin successfully",
            data: {
                token: jwt.sign(user.toJSON(), 'socio', { expiresIn: '100000' })
            }
        }); 
    }
    catch (err) {
        return res.json(500, {
            message: `internal server error: ${err}`
        });
    }
}