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
        // bcrypt.genSalt(10, function (err, salt) {
        //     if (err) {
        //         throw err
        //     } else {
        //         bcrypt.hash("test", salt, function (err, hash) {
        //             if (err) {
        //                 throw err
        //             } else {
        //                 console.log(hash)
        //                 //$2b$10$L.Iodja1nOMAqQ8DIsOSMuh.IBlKXVSuW5iQdFExoK8EcUYe5TdfW
        //             }
        //         })
        //     }
        // })

        ///////
        const result = {
            message: "",
            status: false
        }
        const user = await this.getUser(params.email);
        if (user) {
            const isMatch = await bcrypt.compare(params.password, user.password);
            result.status = isMatch;
            if (isMatch) {
                result.message = `Welcome ${params.email} !`;
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
        // Créer le token (coté node avec jsonwebtoken)  en y stockant email et role et le renvoyer
        // à l'appli React (dans la réponse {email, rôle, token, etc...) si 'lauthentification est ok.
        // Coté React, récupérer le token est le stocker sous forme de cookie avec une expiration à 24h.

        let result={};
        const user = await this.getUser(params.email);
        if(!user){
            result.email = params.email;
            result.role = "1";
            const payload = {mail: params.email, role: 1};
            const token = jwt.sign(payload, appConfig.JWT_SECRET, { expiresIn: '1d' });
            result.token = token;
            
            //SEND MAIL
            const html = 
            `
            <b>Confirmez votre inscription : </b>
            <a href="http://localhost:3000/account/validation?t=${encodeURIComponent(token)}" target="_blank">Confirmer</a>
            
            `;
            await MailerService.sendMail({to: params.email, subject:"Confirmer votre inscription", html});
            result.status= true;
            result.message = "vous allez recevoir un mail pour valider votre inscription!";
            return result;
        }
        return false;
    }
    validate = async (req) => {
        return "post validate";
    }
    renew = async (req) => {
        return "post renew";
    }
}

module.exports = AuthController;