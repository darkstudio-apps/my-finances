/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { Stack, Button, Select, Spinner, HStack } from "@chakra-ui/react"
import {
  TransactionsSummarySection,
  TableTransaction,
  ModalTransaction,
  ModalTransactionRecurrenceDelete,
  ModalTransactionRecurrenceEdit,
} from "partialComponents/transactions"
import { TransactionsContextProvider, useTransactions } from "contexts/transactions"

function Transactions() {
  const {
    transactions,
    filters,
    setFilters,
    handleModalTransactionForm,
  } = useTransactions()

  const handleChangeFilters = (name: string, value: string) => {
    setFilters(old => ({
      ...old,
      [name]: value,
    }))
  }

  const handleOpenNewTransaction = () => {
    handleModalTransactionForm({
      isOpen: true,
      editMode: false,
      dataToEdit: null,
    })
  }

  return (
    <Stack paddingY={[6, 10]} spacing={[6, 10]}>
      <TransactionsSummarySection />

      <Stack spacing={4}>
        <HStack align="center" justify="space-between" spacing={4}>
          <HStack spacing={4}>
            <Select
              fontSize={["13px", "15px", "15px", "15px"]}
              name="month"
              placeholder="Selecione o mês"
              value={filters.month}
              onChange={({ target: { name, value } }) => handleChangeFilters(name, value)}
            >
              <option value="01">Janeiro</option>
              <option value="02">Fevereiro</option>
              <option value="03">Março</option>
              <option value="04">Abril</option>
              <option value="05">Maio</option>
              <option value="06">Junho</option>
              <option value="07">Julho</option>
              <option value="08">Agosto</option>
              <option value="09">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </Select>

            <Select
              fontSize={["13px", "15px", "15px", "15px"]}
              name="year"
              placeholder="Selecione o ano"
              value={filters.year}
              onChange={({ target: { name, value } }) => handleChangeFilters(name, value)}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </Select>
          </HStack>

          <HStack spacing={4}>
            {transactions.isFetching && (
              <Spinner />
            )}

            <Button
              width={["110px", "120px", "160px", "180px"]}
              fontSize={["11px", "15px", "15px", "15px"]}
              onClick={handleOpenNewTransaction}
              borderRadius="md"
              colorScheme="green"
              paddingX={10}
            >
              Nova Transação
            </Button>
          </HStack>
        </HStack>

        <TableTransaction />
      </Stack>

      <ModalTransaction />

      <ModalTransactionRecurrenceEdit />

      <ModalTransactionRecurrenceDelete />
    </Stack>
  )
}

export default () => (
  <TransactionsContextProvider>
    <Transactions />
  </TransactionsContextProvider>
)

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
