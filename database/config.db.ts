import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_CONNECTION_URI);
    console.log("Connected to DB");
  } catch (error: any | undefined) {
    console.log(error);
    throw new Error(error);
  }
};

//Exports
export { dbConnection };
