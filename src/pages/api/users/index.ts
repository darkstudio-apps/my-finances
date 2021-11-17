import { NextApiRequest, NextApiResponse } from "next"
import authorization from "../_middlewares/authorization"
import { userController } from "./_resources/controller/userController"

async function users(req: NextApiRequest, res: NextApiResponse) {
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

export default authorization(users)
