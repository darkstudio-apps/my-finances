import { NextApiRequest, NextApiResponse } from "next"
import { userController } from "../_modules/users/controller/userController"

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      userController.post(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
