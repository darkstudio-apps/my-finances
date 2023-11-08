/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { Stack } from "@chakra-ui/react"
import {
  TransactionSummarySection,
  TransactionListFiltersSection,
  TransactionListSection,
  ModalTransaction,
  ModalTransactionRecurrenceDelete,
  ModalTransactionRecurrenceEdit,
} from "partialComponents/transactions"
import { TransactionsContextProvider } from "contexts/transactions"

function Transactions() {
  return (
    <Stack paddingY={[6, 10]} spacing={[6, 10]}>
      <TransactionSummarySection />

      <Stack spacing={4}>
        <TransactionListFiltersSection />

        <TransactionListSection />
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
