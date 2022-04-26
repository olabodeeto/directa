let secret = "sec_YToy9KMlSJV7w97ZsCXc";

export default function handler(req, res) {
  if (req.method === "POST") {
    const webhook = req.body;
    console.log(webhook);
    res.status(200).json("success");
  }
}
