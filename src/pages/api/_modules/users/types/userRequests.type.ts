import { NextApiRequest } from "next"
import { UserModelProps, UserReqProps } from "models/users/user"

export interface RequestType {
  query: {
    id: string
  }
  body: Partial<UserReqProps>
}

export interface RequestPostType extends NextApiRequest {
  body: UserModelProps
}
