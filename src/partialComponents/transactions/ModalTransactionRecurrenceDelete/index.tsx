import { useToast } from "@chakra-ui/react"
import { AlertDialogDelete, ModalRecurrence } from "components"
import { useTransactions } from "contexts/transactions"
import { ITransactionRequestQueryAction } from "models/transactions"

export function ModalTransactionRecurrenceDelete() {
  const toast = useToast()

  const {
    modalDelete: { idTransaction, isOpenModal, isOpenModalRecurrence },
    closeModalDelete,
    deleteTransaction,
  } = useTransactions()

  const handleSubmit = async (id: string | null, action?: ITransactionRequestQueryAction) => {
    if (!id) {
      toast({
        title: "Erro ao excluir a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await deleteTransaction.mutateAsync({ id, action })

    closeModalDelete()
  }

  const handleSubmitModalDelete = async () => {
    handleSubmit(idTransaction)
  }

  const handleSubmitModalRecurrenceDelete = async (action: ITransactionRequestQueryAction) => {
    handleSubmit(idTransaction, action)
  }

  return (
    <>
      <AlertDialogDelete
        isOpen={isOpenModal}
        id={idTransaction || ""}
        title="Deletar transação"
        description="Deseja realmente excluir a transação?"
        onClose={closeModalDelete}
        onSubmit={handleSubmitModalDelete}
        isLoading={deleteTransaction.isLoading}
      />

      <ModalRecurrence
        isOpen={isOpenModalRecurrence}
        title="Excluir uma transação recorrente"
        colorScheme="red"
        titleBtnConfirm="Excluir"
        onClose={closeModalDelete}
        onSubmit={handleSubmitModalRecurrenceDelete}
        onCancel={closeModalDelete}
        options={{
          current: "Excluir a atual",
          next: "Excluir a atual e as próximas",
          all: "Excluir todas",
        }}
        isLoading={deleteTransaction.isLoading}
      />
    </>
  )
}
