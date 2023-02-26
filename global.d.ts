namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_CONNECTION_URI: string;
    SECRET_JWT_KEY: string;
  }
}