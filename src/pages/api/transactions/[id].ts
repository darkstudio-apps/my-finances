import { NextApiRequest, NextApiResponse } from "next"
import { TransactionReqProps } from "../../../hooks/useTransactions/transactions.type"
import { transactionController } from "./_resources/controller/transactionController"

export interface RequestType {
  query: {
    id: string
  }
  body: Partial<TransactionReqProps>
}

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
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
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
