const jwt = require("jsonwebtoken");
const Users = require("../models/userModel.js");

const whoami = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(401).json({ error: "Anda Belum Login" });
    }
    console.log(token)
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden - Token is not valid" });
            }
            const username = decoded.username 
            const user = await Users.findOne({
                attributes: ['id_user','username', 'email', 'id_level'],
                where: {
                    username
                }
            });
            return res.json(user);
        });
    } catch (error) {
        return res.status(403).json({ error: "Forbidden - Token is not valid" });
    }
}

module.exports = {
    whoami
}