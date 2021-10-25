import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { SimpleGrid, Stack } from "@chakra-ui/react"
import { CardTransaction } from "../components/CardTransaction"
import { TableTransaction } from "../components/TableTransaction"

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

      <TableTransaction data={transactions} />
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
