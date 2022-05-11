import { AlertDialogDelete } from "components/AlertDialogDelete"
import { ModalRecurrence } from "components/ModalRecurrence"
import { useTransactions } from "contexts/transactions"

export function ModalTransactionRecurrenceDelete() {
  const {
    modalDelete: { idTransaction, isOpenModal, isOpenModalRecurrence },
    setModalDelete,
    deleteTransaction,
    closeModalDelete,
  } = useTransactions()

  const handleSubmitModalDelete = async () => {
    const id = idTransaction
    if (!id) return

    await deleteTransaction.mutateAsync({ id: idTransaction })

    closeModalDelete()
  }

  const handleSubmitModalRecurrenceDelete = () => {
    console.log("handleSubmitModalRecurrenceDelete")
  }

  const handleCloseModalDelete = () => {
    setModalDelete(oldValue => ({
      ...oldValue,
      isOpenModal: false,
    }))
  }

  const handleCloseModalRecurrenceDelete = () => {
    setModalDelete(oldValue => ({
      ...oldValue,
      isOpenModalRecurrence: false,
    }))
  }

  return (
    <>
      <AlertDialogDelete
        isOpen={isOpenModal}
        id={idTransaction || ""}
        title="Deletar transação"
        description="Deseja realmente exluir a transação?"
        onClose={handleCloseModalDelete}
        onSubmit={handleSubmitModalDelete}
        isLoading={deleteTransaction.isLoading}
      />

      <ModalRecurrence
        isOpen={isOpenModalRecurrence}
        title="Excluir uma transação recorrente"
        colorScheme="red"
        titleBtnConfirm="Excluir"
        onClose={handleCloseModalRecurrenceDelete}
        onSubmit={handleSubmitModalRecurrenceDelete}
        options={{
          current: "Excluir a transação atual",
          next: "Excluir a transação atual e as proximas",
          all: "Excluir todas as transações",
        }}
        isLoading={deleteTransaction.isLoading}
      />
    </>
  )
}
