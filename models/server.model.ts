import express from "express";
import cors from "cors";

import * as db from "../database/config.db";

class Server {
  app: any;
  port: string;

  usersPath = "/api/users";
  categoriesPath = "/api/categories";

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Start server functions
    this.connectDB();
    this.middlewares();
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

  //Middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  //Routes
  routes() {
    this.app.use(this.usersPath, require("../routes/users.routes"));
    this.app.use(this.categoriesPath, require("../routes/categories.routes"));
  }
}

//Exports
export { Server };
