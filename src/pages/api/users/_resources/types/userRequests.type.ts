import { NextApiRequest } from "next"
import { UserModelProps, UserReqProps } from "../../../../../hooks/useUsers/user.types"

export interface RequestType {
  query: {
    id: string
  }
  body: Partial<UserReqProps>
}

export interface RequestPostType extends NextApiRequest {
  body: UserModelProps
}
