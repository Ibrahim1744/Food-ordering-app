import dbConnect from "../../../utils/mongo";
import OrderS from "../../../models/OrderS";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await OrderS.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json("ششششششش");
    }
  }
  if (method === "POST") {
    try {
      const order = await OrderS.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json("ششششششش");
    }
  }
};

export default handler;