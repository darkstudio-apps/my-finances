import { NextApiRequest, NextApiResponse } from "next"
import { transactionController } from "./_resources/controller/transactionController"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    transactionController.list(req, res)
  }

  res.setHeader("Allow", ["GET"])
  res.status(405).end(`Method ${method} Not Allowed`)
}
