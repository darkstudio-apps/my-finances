import { NextApiRequest, NextApiResponse } from "next"

import { RequestType } from "../_modules/transactions/types/transactionRequests.type"
import { transactionController } from "../_modules/transactions/controller/transactionController"

import authorization from "../_middlewares/authorization"

async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req

  const idTransaction = Array.isArray(query.id) ? query.id[0] : query.id

  const request: RequestType = {
    query: {
      id: idTransaction,
    },
    body,
  }

  switch (method) {
    case "GET":
      transactionController.get(request, res)
      break
    case "PUT":
      transactionController.put(request, res)
      break
    case "PATCH":
      transactionController.patch(request, res)
      break
    case "DELETE":
      transactionController.remove(request, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authorization(transactions)
