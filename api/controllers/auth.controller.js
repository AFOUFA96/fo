const BaseController = require("./base.controller");
 
class AuthController extends BaseController {

    login = async (req) => {
        return "post login";
    }
    register = async (req) => {
        return "post register";
    }
    validate = async (req) => {
        return "post validate";
    }
    renew = async (req) => {
        return "post renew";
    }
}

module.exports = AuthController;