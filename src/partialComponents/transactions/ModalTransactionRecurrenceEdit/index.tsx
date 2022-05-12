import { useToast } from "@chakra-ui/react"
import { ModalRecurrence } from "components/ModalRecurrence"
import { useTransactions } from "contexts/transactions"
import { ITransactionRequestQueryAction } from "models/transactions"

export function ModalTransactionRecurrenceEdit() {
  const toast = useToast()

  const {
    modalRecurrenceEdit: { isOpen, idTransaction, transaction },
    closeModalRecurrenceEdit,
    editTransaction,
  } = useTransactions()

  const handleSubmit = async (action: ITransactionRequestQueryAction) => {
    if (!idTransaction) {
      toast({
        title: "Erro ao excluir a transação!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await editTransaction.mutateAsync({
      id: idTransaction,
      transaction,
      action,
    })

    closeModalRecurrenceEdit()
  }

  return (
    <ModalRecurrence
      isOpen={isOpen}
      title="Editar uma transação recorrente"
      colorScheme="green"
      titleBtnConfirm="Salvar"
      onClose={closeModalRecurrenceEdit}
      onSubmit={handleSubmit}
      options={{
        current: "Editar a atual",
        next: "Editar a atual e as proximas",
        all: "Editar todas",
      }}
    />
  )
}
