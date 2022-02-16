import { NextApiRequest, NextApiResponse } from "next"
import { userController } from "../_modules/users/controller/userController"
import authorization from "../_middlewares/authorization"

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
