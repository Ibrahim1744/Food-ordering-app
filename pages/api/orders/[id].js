import dbConnect from "../../../utils/mongo";
import OrderS from "../../../models/OrderS";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await OrderS.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json("ششششششش");
    }
  }
  if (method === "PUT") {
    try {
      const order = await OrderS.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json("ششششششش");
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;