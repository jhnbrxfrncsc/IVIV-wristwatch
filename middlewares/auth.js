import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const createAccessToken = ({_id, email, isAdmin}) => {
    const data = { _id, email, isAdmin };

    return jwt.sign(data, SECRET_KEY);
}


export const verify = (req, res, next) => {
    const token = req.headers;
    console.log(req.headers);

    // if(token) {
    //     return jwt.verify(token.split(" ")[1], SECRET_KEY, (err, data) => {
    //         if(err) {
    //             return res.json({ auth: "Failed" });
    //         } else {
    //             next();
    //         }
    //     });
    // } else {
    //     return res.json({message: "No Token"});
    // }
}

export const decode = (token) => {
    if(token) {
        return jwt.verify(token, SECRET_KEY, (err, data) => {
            if(err) {
                return res.send({ auth: "Failed" });
            } else {
                return jwt.decode(token, { complete: true }).payload;
            }
        });
    }
}