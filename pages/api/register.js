async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
  }
  res.status(200).send({ message: "success" });
}
export default handler;
