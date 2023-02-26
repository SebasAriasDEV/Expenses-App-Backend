import express from "express";
import * as db from "../database/config.db";

class Server {
  app: any;
  port: number;

  usersPath = "/api/users";

  constructor() {
    this.app = express();
    this.port = 8000;

    //Start server functions
    this.connectDB();
    this.routes();
    this.listen();
  }

  //Listen
  listen() {
    this.app.listen(this.port, console.log(`Listening on port: ${this.port}`));
  }

  //DB connection
  async connectDB() {
    await db.dbConnection();
  }

  //Routes
  routes() {
    this.app.use(this.usersPath, require("../routes/users.routes"));
  }
}

//Exports
export { Server };
