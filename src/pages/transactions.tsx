import { useState } from "react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { SimpleGrid, Stack, useDisclosure, Button, Select, HStack } from "@chakra-ui/react"

import { CardTransaction } from "../components/CardTransaction"
import { TableTransaction } from "../components/TableTransaction"
import { SimpleGrid, Stack, useDisclosure, Button } from "@chakra-ui/react"
import { ModalTransaction } from "../components/ModalTransaction"

interface TransactionsProps {
  id: number
  title: string
  price: string
  category: string
  date: string
  isIncome: boolean
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [filters, setFilters] = useState(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1

    return {
      month,
      year,
    }
  })

  return (
    <Stack paddingY={10} spacing={10}>
      <SimpleGrid columns={3} spacing={10}>
        <CardTransaction
          description="Entradas"
          title="R$ 1.400,00"
          icon="arrowUp"
        />

        <CardTransaction
          description="Saídas"
          title="R$ 400,00"
          icon="arrowDown"
        />

        <CardTransaction
          description="Total"
          title="R$ 1.000,00"
          icon="dollarSign"
        />
      </SimpleGrid>

      <Stack spacing={4} >
        <HStack align="center" justify="space-between" spacing={4}>
          <HStack spacing={4}>
            <Select
              name="month"
              placeholder="Selecione o mês"
              value={filters.month}
              onChange={({ target: { name, value } }) => setFilters(old => ({ ...old, [name]: value }))}
            >
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </Select>

            <Select
              name="year"
              placeholder="Selecione o ano"
              value={filters.year}
              onChange={({ target: { name, value } }) => setFilters(old => ({ ...old, [name]: value }))}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </Select>
          </HStack>

          <Button
            onClick={onOpen}
          maxWidth="200px"
            borderRadius="md"
            colorScheme="blue"
            paddingX={10}
          >
            Nova Transação
          </Button>
        </HStack>

        <TableTransaction data={transactions} />
      </Stack>

      <ModalTransaction isOpen={isOpen} onClose={onClose} />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
