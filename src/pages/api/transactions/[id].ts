import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import {
  transactionControllerDelete,
  transactionControllerGet,
  transactionControllerPut,
} from "../../../modulesApi/transactions/transactionController"
import {
  ITransactionRequest,
  ITransactionRequestSession,
} from "../../../modulesApi/transactions/types/transactionRequest.type"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: ITransactionRequestSession = await getSession({ req }) as any

    const idUser = session?.user?.idUser

    if (!idUser) throw new Error("id user not found")

    const { method, query, body } = req

    const id = Array.isArray(query.id) ? query.id[0] : query.id
    const actionQuery = Array.isArray(query.action) ? query.action[0] : query.action

    let action: undefined | "current" | "next" | "all" = undefined

    if (actionQuery === "current" || actionQuery === "next" || actionQuery === "all") {
      action = actionQuery
    }

    const request: ITransactionRequest = {
      query: {
        idUser,
        id,
        action,
      },
      body,
    }

    switch (method) {
      case "GET":
        transactionControllerGet(request, res)
        break
      case "PUT":
        transactionControllerPut(request, res)
        break
      case "DELETE":
        transactionControllerDelete(request, res)
        break
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
