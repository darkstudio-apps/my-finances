import { EmptyTransactionList } from "./EmptyTransactionList"
import { TransactionListDesktop } from "./TransactionListDesktop"
import { TransactionListMobile } from "./TransactionListMobile"
import { useTransactions } from "contexts/transactions"
import { useIsDesktopMode } from "utils/helpers"
import { ITransaction } from "models/transactions"

export function TransactionListSection() {
  const { transactions, handleModalTransactionForm, openModalDelete } = useTransactions()

  const isDesktopMode = useIsDesktopMode()

  const openDialogDelete = (transaction: ITransaction) => {
    const { id, isRecurrence } = transaction
    openModalDelete(id, isRecurrence)
  }

  const handleEnableModal = (transactionToEdit: ITransaction, editMode = false) => {
    handleModalTransactionForm({
      isOpen: true,
      editMode,
      dataToEdit: { ...transactionToEdit },
    })
  }

  if (transactions.isLoading) return null

  if (!transactions.data || transactions.data.length < 1) {
    return <EmptyTransactionList />
  }

  return (
    isDesktopMode
      ? (
        <TransactionListDesktop
          data={transactions.data}
          openDialogDelete={openDialogDelete}
          handleEnableModal={handleEnableModal}
        />
      )
      : (
        <TransactionListMobile
          data={transactions.data}
          openDialogDelete={openDialogDelete}
          handleEnableModal={handleEnableModal}
        />
      )
  )
}
