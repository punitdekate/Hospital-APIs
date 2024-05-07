import jwt from 'jsonwebtoken';

//jwt authorization to secure the apis access
const jwtAuth = async(req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "unauthorize"
            });
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default jwtAuth;