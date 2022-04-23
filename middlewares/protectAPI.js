import mongoose from "mongoose";
import { Constants } from "../Constants";
const protectAPI = (handler) => {
  return async (req, res) => {
    mongoose.connect(Constants.dbLink, {});
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
    // return;
  };
};

export default protectAPI;
