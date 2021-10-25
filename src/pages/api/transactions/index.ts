// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "next-auth/jwt"

const secret = process.env.JWT_SECRET

import { getSession } from "next-auth/client"

// type MethodsProps = "get" | "post" | "put" | "patch" | "delete"

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret })
  const session = await getSession({ req })

  const users = [
    { name: "1 - John Doe" },
    { name: "2 - John Doe" },
    { name: "3 - John Doe" },
  ]

  return res.status(200).json({ users, token, session })
}
