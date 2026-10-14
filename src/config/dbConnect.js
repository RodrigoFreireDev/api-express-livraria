import mongoose from "mongoose";

async function conecao() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
};

export default conecao;
