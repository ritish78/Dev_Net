const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/Users');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    console.log({ token });

    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Verifiying token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;

        console.log({decoded});
        console.log(req.user);

        TODO:
        //Implement the feature to check if the verified token
        //belongs to the deleted user. If so, we return 'Invalid Token!'

        // const user = await User.findById(decoded.user.id);
        // if (!user) {
        //     return res.status(401).json({ msg: 'Invalid Token!' });
        // }

        next();

    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token!' });
    }
}