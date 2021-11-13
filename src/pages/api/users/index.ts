import { NextApiRequest, NextApiResponse } from "next"
import { userController } from "./_resources/controller/userController"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      userController.list(req, res)
      break
    case "POST":
      userController.post(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
