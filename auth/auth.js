const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    userModel.lookup(username, function (err, user) {
        if (err) {
            console.log("error looking up user", err);
            return res.status(401).send();
        }
        if (!user) {
            console.log("user ", username, " not found");
            
            return res.render("user/register");
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let payload = { username: username };
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
                res.cookie("jwt", accessToken);
                next();
            } else {
                return res.render("user/login");
            }
        });
    });
};


// exports.login = function (req, res) {
//     let username = req.body.username;
//     let password = req.body.password;

//     userModel.lookup(username, function (err, user) {
//         if (err) {
//             console.log("error looking up user", err);
//             return res.status(401).json({ error: "Authentication failed" });
//         }
//         if (!user) {
//             console.log("user ", username, " not found");
//             return res.status(404).json({ error: "User not found" });
//         }
//         bcrypt.compare(password, user.password, function (err, result) {
//             if (result) {
//                 let payload = { username: username };
//                 let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
//                 res.cookie("jwt", accessToken);
//                 res.status(200).json({ token: accessToken });
//                 next();
//             } else {
//                 return res.status(401).json({ error: "Invalid credentials" });
//             }
//         });
//     });
// };

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.render("user/login");
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        res.locals.user = payload;
        next();
    } catch (e) {
        return res.render("user/login");
    }
};


exports.checkJWT = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if(accessToken){
        let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        res.locals.user = payload;
    }
    next();
};