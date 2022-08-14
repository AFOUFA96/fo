const BaseController = require("./base.controller");
const bcrypt = require('bcrypt');
const appConfig = require("../../config/app.config");
const MailerService = require("../services/mailer.service");
const jwt = require('jsonwebtoken');

class AuthController extends BaseController {

    getUser = async (email) => {
        const UserServiceClass = require('../services/user.service');
        const service = new UserServiceClass();
        const users = await service.selectAll({ where: `email = '${email}'` });
        return users.length === 1 ? users.pop() : null;
    }

    login = async (params) => {
        const result = {
            status: false
        }
        const user = await this.getUser(params.email);
        if (user) {
            const isMatch = await bcrypt.compare(params.password, appConfig.HASH_PREFIX + user.password);
            result.status = isMatch;
            if (isMatch) {
                result.email = params.email;
                result.role = user.role;
                const payload = { email: params.email, role: user.role };
                const token = jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '1d' });
                result.token = token;

            //     //SEND MAIL
            //     const html =
            //         `
            // <b>Confirmez votre inscription : </b>
            // <a href="http://localhost:3000/account/validation?t=${encodeURIComponent(token)}" target="_blank">Confirmer</a>
            
            // `;
            //     await MailerService.sendMail({ to: params.email, subject: "Confirmer votre inscription", html });
                result.status = true;
                result.message = "Authentification réussie :D!";
                return result;
            }
            else {
                result.message = "mot de passe erroné!";
            }
        }
        else {
            result.message = "email doesn't exist";
        }
        return result;
    }
    register = async (params) => {

    }
    validate = async (req) => {
        return "post validate";
    }
    renew = async (req) => {
        return "post renew";
    }
    check = async (req) => {
        const auth = req.cookies.auth;
        if (auth) {
            const result = jwt.verify(auth, appConfig.JWT_SECRET);
            if (result) {
                return { status: true, role: result.role, email: result.email }
            }
        }
        return { status: false, role: 0 }
    }
}

module.exports = AuthController;

// const password = "admin";
// const saltRounds = 10;

// bcrypt.genSalt(saltRounds, function (err, salt) {
//     if (err) {
//         throw err
//     } else {
//         bcrypt.hash(password, salt, function (err, hash) {
//             if (err) {
//                 throw err
//             } else {
//                 console.log(hash)
//                 //$2b$10$L.Iodja1nOMAqQ8DIsOSMuh.IBlKXVSuW5iQdFExoK8EcUYe5TdfW
//             }
//         })
//     }
// })