import protectAPI from "../../middlewares/protectAPI";
const handler = async (req, res) => {
  let database = process.env.CONNECTION_STRING;
  res.status(200).send(database);
};

export default protectAPI(handler);
