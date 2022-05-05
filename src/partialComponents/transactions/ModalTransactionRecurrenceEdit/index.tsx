import { ModalRecurrence } from "components/ModalRecurrence"
import { useTransactions } from "contexts/transactions"

export function ModalTransactionRecurrenceEdit() {
  const { } = useTransactions

  return (
    <ModalRecurrence
      isOpen={true}
      title="Editar uma transação recorrente"
      colorScheme="green"
      titleBtnConfirm="Salvar"
      onClose={() => { console.log("onClose") }}
      onConfirm={() => { console.log("onConfirm") }}
      options={{
        current: "Editar a transação atual",
        next: "Editar a transação atual e as proximas",
        all: "Editar todas as transações",
      }}
    />
  )
}
