const jwt = require ('jsonwebtoken');
const dotenv = require ('dotenv');


dotenv.config()

const authAdmin = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if (decode.role === 'admin'){
                next()
            } else {
                res.status(401);
                res.json('Not allowed');
            } 
        } else {
            res.status(401);
            res.json('login Erorr: please try again');
        }
        
    } catch (err) {
        res.status(401);
        res.json('login Erorr: please try again');
    }
}

const authUser = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        if (token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if (decode.role === 'user'){
                next()
            } else {
                res.status(401);
                res.json('Not allowed');
            } 
        } else {
            res.status(401);
            res.json('login Erorr: please try again');
        }
        
    } catch (err) {
        res.status(401);
        res.json('login Erorr: please try again');
    }
}

module.exports = {
    authAdmin,
    authUser
};
