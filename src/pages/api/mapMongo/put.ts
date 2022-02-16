import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import authorization from "../_middlewares/authorization"
import { prisma } from "../../../services/prisma"

async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === "GET") {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "asc",
      },
    })

    const logFileName = `${Date.now()}.txt`

    try {
      transactions.forEach(async transaction => {
        const {
          date: currentDate,
          id: idTransaction,
          ...rest
        } = transaction

        const dateAdjusted = parseToBRdateHackUTC(currentDate)

        const isRecurrence = transaction.type !== ""

        const transactionMapped = {
          ...rest,
          date: dateAdjusted,
          isRecurrence,
        }

        await prisma.transaction.update({
          where: { id: idTransaction },
          data: transactionMapped,
        })

        const data = `
* transaction editada: ${idTransaction}
* data: ${currentDate} | dateAdjusted: ${dateAdjusted}
`

        fs.appendFileSync(`./log/${logFileName}`, data)

        return transactionMapped
      })
    } catch (err) {
      fs.appendFileSync(`./log/${logFileName}`, "\n> ERRO")
      return res.status(500).json({ err })
    }

    return res.status(200).json({ ok: true })
  }

  res.status(405).end(`Method ${method} Not Allowed`)
}

export const parseToBRdateHackUTC = (dateUTC: string) => {
  const date = new Date(dateUTC)

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()

  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  const dateMillisecondsUTC = Date.UTC(year, month, day, hours, minutes, seconds)

  return new Date(dateMillisecondsUTC).toISOString()
}

export default authorization(transactions)
