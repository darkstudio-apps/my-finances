import { ModalRecurrence } from "components/ModalRecurrence"
import { useTransactions } from "contexts/transactions"

export function ModalTransactionRecurrenceDelete() {
  const {
    isOpenModalRecurrenceDelete,
    setIsOpenModalRecurrenceEdit,
  } = useTransactions()

  return (
    <ModalRecurrence
      isOpen={isOpenModalRecurrenceDelete}
      title="Excluir uma transação recorrente"
      colorScheme="red"
      titleBtnConfirm="Excluir"
      onClose={() => { console.log("onClose") }}
      onConfirm={() => { console.log("onConfirm") }}
      options={{
        current: "Excluir a transação atual",
        next: "Excluir a transação atual e as proximas",
        all: "Excluir todas as transações",
      }}
    />
  )
}
