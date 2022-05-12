import { ReactNode } from "react"
import { Th } from "@chakra-ui/react"

interface ITableTransactionTh {
  children: ReactNode
}

export function TableTransactionTh({ children }: ITableTransactionTh) {
  return (
    <Th color="gray.50" opacity="0.7" borderColor="gray.600">
      {children}
    </Th>
  )
}
