import { NextApiRequest, NextApiResponse } from "next"
import authorization from "../_middlewares/authorization"
import { transactionController } from "./_resources/controller/transactionController"

async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      transactionController.list(req, res)
      break
    case "POST":
      transactionController.post(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authorization(transactions)
