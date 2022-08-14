const express = require('express');
const Router = express.Router;
const AuthController = require("../controllers/auth.controller");
const BaseRouter = require("./base.router");
class AuthRouter extends BaseRouter {
    constructor() {
        super();
        // this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes = () => {
        // this.router.post("/", async (req, res) => {
        //     const response = await new AuthController().login(req.body);
        //     res.send(response);
        // });
        this.router.post("/login", async (req, res) => {
            const response = await new AuthController().login(req.body);
            res.send(response);
          });
          this.router.post("/register", async (req, res) => {
            const response = await new AuthController().register(req.body);
            res.send(response);
            // res.send(`post register`);
          });
          this.router.post("/validate", async (req, res) => {
            const response = await new AuthController().validate(req.body);
            res.send(response);
            // res.send(`post validate`);
          });
          this.router.post("/renew", async (req, res) => {
            const response = await new AuthController().renew(req.body);
            res.send(response);
            // res.send(`post renew`);
          });
          this.router.get("/", async (req, res) => {
            const response = await new AuthController().check(req);
            res.json(response);
        });
    }
}
module.exports = AuthRouter;