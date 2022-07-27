import { NextApiRequest, NextApiResponse } from "next"
import { userControllerPost } from "modulesApi/users/userController"

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "POST":
      userControllerPost(req, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
