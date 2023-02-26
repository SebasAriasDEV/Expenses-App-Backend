import express from "express";
import * as db from "../database/config.db";

class Server {
  app: any;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;

    this.connectDB();
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
}

//Exports
export { Server };
