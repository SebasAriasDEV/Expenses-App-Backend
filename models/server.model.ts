import express from "express";

class Server {
  app: any;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8000;

    this.listen();
  }

  //Listen
  listen() {
    this.app.listen(this.port, console.log(`Listening on port: ${this.port}`));
  }
}

//Exports
export { Server };
