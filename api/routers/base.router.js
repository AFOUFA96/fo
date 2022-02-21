const express = require('express');
const Router = express.Router; //cherche router express
// const router = Router(); // creer une instance d'express

class BaseRouter {
  constructor() {
    this.router = Router();
    this.name = this.constructor.name.replace(`Router`, ``);
    this.table = this.name.toLowerCase();
    this.initializeRoutes();
  }

  
  initializeRoutes = () => {
    // this.router.get("/", async (req, res) => {
    //   res.send(`get all ${this.table} rows`);
    // });

    // this.router.get("/:id", async (req, res) => {
    //   res.send(`get one ${this.table} row with id=${req.params.id}`);
    // });
    // //post to create one row in db table contact
    // this.router.post("/", async (req, res) => {
    //   const response = this.controller.createOne();
    //   res.send(response);
    // });
    // //put to update one row in db table contact
    // this.router.put("/:id", async (req, res) => {
    //   const response = this.controller.updateOne(req.params.id);
    //   res.send(response);
    // });
    // //delete to destroy one row in db table contact
    // this.router.delete("/:id", async (req, res) => {
    //   const response = this.controller.deleteOne(req.params.id);
    //   res.send(response);
    // });
  };

}
module.exports = BaseRouter;




// pour tester post put delete il faut tester dans http
// => installer rest client
