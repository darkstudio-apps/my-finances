import { NextApiRequest, NextApiResponse } from "next"
import { transactionController } from "./_resources/controller/transactionController"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req

  if (query.id) {
    const idTransaction = Array.isArray(query.id) ? query.id[0] : query.id
    req.query.id = idTransaction
  }

  switch (method) {
    case "GET":
      transactionController.get(req, res)
      break
    case "POST":
      transactionController.post(req, res)
      break
    case "PUT":
      transactionController.put(req, res)
      break
    case "PATCH":
      transactionController.patch(req, res)
      break
    case "DELETE":
      transactionController.remove(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
