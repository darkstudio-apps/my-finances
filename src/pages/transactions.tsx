import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { SimpleGrid, Stack } from "@chakra-ui/react"
import { CardTransaction } from "../components/CardTransaction"
import { TableTransaction } from "../components/TableTransaction"
import { Table, Thead, Tbody, Tfoot, Tr, Th } from "@chakra-ui/react"

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

  useEffect(() => {
    const fetchTransactions = [
      {
        id: Date.now(),
        title: "Desenvolvimento de site",
        price: "R$ 12.000,00",
        category: "Venda",
        date: "13/04/2021",
        isIncome: true,
      },
      {
        id: Date.now(),
        title: "Hamburguer",
        price: "R$ 59,00",
        category: "Alimentação",
        date: "10/04/2021",
        isIncome: false,
      },
      {
        id: Date.now(),
        title: "Computador",
        price: "R$ 5.400,00",
        category: "Venda",
        date: "01/04/2021",
        isIncome: true,
      },
      {
        id: Date.now(),
        title: "Aluguel do Apartamento",
        price: "R$ 1.200,00",
        category: "Casa",
        date: "05/04/2021",
        isIncome: false,
      },
    ]

    setTransactions(fetchTransactions)
  }, [])

  return (
    <Stack paddingY={10}>
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

      <Stack paddingY={10}>
        <Table variant="simple" bg="gray.700" borderRadius="xl">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Preço</Th>
              <Th>Categoria</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>

          <Tbody>
            {transactions.map((transaction) => (
              <TableTransaction
                key={transaction.id}
                title={transaction.title}
                price={transaction.price}
                category={transaction.category}
                date={transaction.date}
                isIncome={transaction.isIncome}
              />
            ))}
          </Tbody>

          <Tfoot>
            <Tr>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </Stack>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  console.log("session: ", session)

  if (!session) {
    console.log("redirect: ", session)

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
