import mongoose from "mongoose";
const protectAPI = (handler) => {
  return async (req, res) => {
    mongoose.connect(process.env.CONNECTION_STRING, {});
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
    // return;
  };
};

export default protectAPI;
