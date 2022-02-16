import { NextApiRequest, NextApiResponse } from "next"
import authorization from "../_middlewares/authorization"
import { prisma } from "../../../services/prisma"

async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: {
          date: "asc",
        },
      })

      return res.status(200).json({ transactions })
    } catch (error) {
      console.log("error: ", error)
      res.status(500).json({ error })
    }
  }

  res.status(405).end(`Method ${method} Not Allowed`)
}

export default authorization(transactions)
