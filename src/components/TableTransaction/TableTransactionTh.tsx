import { ReactNode } from "react"
import { Th } from "@chakra-ui/react"

interface TableTransactionThProps {
  children: ReactNode
}

export function TableTransactionTh({ children }: TableTransactionThProps) {
  return (
    <Th color="gray.50" opacity="0.7" borderColor="gray.600">
      {children}
    </Th>
  )
}
