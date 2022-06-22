import { NextApiRequest, NextApiResponse } from "next"
import { ITransactionRequest, ITransactionRequestSession } from "../_modules/transactions/types/transactionRequest.type"
import { transactionController } from "../_modules/transactions/controller/transactionController"
import { getSession } from "next-auth/react"

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
        transactionController.get(request, res)
        break
      case "PUT":
        transactionController.put(request, res)
        break
      case "DELETE":
        transactionController.remove(request, res)
        break
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
