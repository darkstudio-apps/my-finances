import { NextApiRequest, NextApiResponse } from "next"
import { transactionController } from "./_resources/controller/transactionController"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      transactionController.list(req, res)
      break
    case "POST":
      transactionController.post(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
