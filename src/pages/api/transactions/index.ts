import { NextApiRequest, NextApiResponse } from "next"
import { getServerSessionCustom } from "pages/api/auth/[...nextauth]"
import {
  transactionControllerList,
  transactionControllerPost,
} from "../../../modulesApi/transactions/transactionController"
import {
  ITransactionRequestRoot,
  ITransactionRequestSession,
} from "../../../modulesApi/transactions/types/transactionRequest.type"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: ITransactionRequestSession = await getServerSessionCustom({ req, res }) as any

    const idUser = session?.user?.idUser

    if (!idUser) throw new Error("id user not found")

    const { method, query, body } = req

    const month = Array.isArray(query.month) ? query.month[0] : query.month
    const year = Array.isArray(query.year) ? query.year[0] : query.year

    const request: ITransactionRequestRoot = {
      query: {
        idUser,
        month,
        year,
      },
      body,
    }

    switch (method) {
      case "GET":
        transactionControllerList(request, res)
        break
      case "POST":
        transactionControllerPost(request, res)
        break
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
