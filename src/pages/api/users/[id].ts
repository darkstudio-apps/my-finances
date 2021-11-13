import { NextApiRequest, NextApiResponse } from "next"
import { RequestType } from "./_resources/types/userRequests.type"
import { userController } from "./_resources/controller/userController"

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req

  const idUser = Array.isArray(query.id) ? query.id[0] : query.id

  const request: RequestType = {
    query: {
      id: idUser,
    },
    body,
  }

  switch (method) {
    case "GET":
      userController.get(request, res)
      break
    case "PUT":
      userController.put(request, res)
      break
    case "PATCH":
      userController.patch(request, res)
      break
    case "DELETE":
      userController.remove(request, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
