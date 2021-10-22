// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next"

type MethodsProps = "get" | "post" | "put" | "patch" | "delete"

export default function transactions(req: NextApiRequest, res: NextApiResponse) {
  const users = [
    { name: "1 - John Doe" },
    { name: "2 - John Doe" },
    { name: "3 - John Doe" },
  ]

  return res.status(200).json(users)
}
