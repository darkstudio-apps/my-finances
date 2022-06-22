import { NextApiRequest, NextApiResponse } from "next"
import {
  userControllerDelete,
  userControllerGet,
  userControllerPut,
} from "../_modules/users/userController"
import {
  IUserRequestGet,
  IUserRequestPut,
  IUserRequestRemove,
} from "../_modules/users/types/userRequest.type"

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req

  const idUser = Array.isArray(query.id) ? query.id[0] : query.id

  switch (method) {
    case "GET":
      const getRequest: IUserRequestGet = {
        query: {
          id: idUser,
        },
      }
      userControllerGet(getRequest, res)
      break
    case "PUT":
      const putRequest: IUserRequestPut = {
        query: {
          id: idUser,
        },
        body,
      }
      userControllerPut(putRequest, res)
      break
    case "DELETE":
      const removeRequest: IUserRequestRemove = {
        query: {
          id: idUser,
        },
      }
      userControllerDelete(removeRequest, res)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
