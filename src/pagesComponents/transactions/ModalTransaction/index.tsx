import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  HStack,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { CheckBoxCard } from "components/CheckBoxCard"
import { useTransactions, generateTransactionToSave, validateTransaction } from "contexts/transactions"
import { ITransaction, ITransactionFormState } from "models/transactions"

interface IModalTransaction {
  isOpen: boolean
  dataToEdit?: ITransaction | null
  editMode: boolean
  onClose: () => void
}

export function ModalTransaction({ isOpen, dataToEdit, editMode, onClose }: IModalTransaction) {
  const toast = useToast()
  const initialRef = useRef(null)

  const {
    transactionForm,
    setTransactionForm,
    handleChangeTransactionForm,
    createTransaction,
    editTransaction,
    clearStateTransactionForm,
  } = useTransactions()

  useEffect(() => {
    if (dataToEdit) {
      const transitionToEdit: ITransactionFormState = {
        title: dataToEdit.title,
        amount: dataToEdit.amountDisplay,
        date: dataToEdit.date,
        status: dataToEdit.status,
        typeRecurrence: dataToEdit.typeRecurrence,
        installments: dataToEdit.installments,
        type: dataToEdit.type,
      }

      setTransactionForm(transitionToEdit)
      setEnableEditing(false)
    }
    else {
      clearStateTransactionForm()
      setEnableEditing(false)
    }
  }, [dataToEdit])

  const [enableEditing, setEnableEditing] = useState(false)
  useEffect(() => { setEnableEditing(editMode) }, [editMode])

  const isDisabled = !!dataToEdit && !enableEditing

  const handleSave = async () => {
    const isValid = validateTransaction(transactionForm)

    if (!isValid) {
      return toast({
        title: "Campos obrigatórios",
        description: "Todos os campos devem ser preenchidos.",
        status: "warning",
        position: "top",
        duration: 4000,
        isClosable: true,
      })
    }

    if (!dataToEdit) {
      const newTransaction = await generateTransactionToSave(transactionForm)
      if (newTransaction) await createTransaction.mutateAsync(newTransaction)
    }
    else {
      const modifiedTransaction = await generateTransactionToSave(transactionForm)
      if (modifiedTransaction) await editTransaction.mutateAsync({
        id: dataToEdit.id,
        transaction: modifiedTransaction,
        action: "current",
      })
    }

    onClose()
    clearStateTransactionForm()
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader>
          {
            !dataToEdit
              ? "Cadastrar Transação"
              : enableEditing
                ? "Editar Transação"
                : "Visualizar Transação"
          }
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Input
              name="title"
              placeholder="Nome"
              value={transactionForm.title}
              onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
              ref={initialRef}
              disabled={isDisabled}
              _disabled={{ cursor: "no-drop" }}
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                placeholder="Valor"
                value={transactionForm.amount}
                onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop" }}
              />

              <Input
                name="date"
                placeholder="Data"
                value={transactionForm.date}
                onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
                type="date"
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop" }}
                css={
                  css`
                    &[type="date"]::-webkit-calendar-picker-indicator {
                      background: no-repeat center/75% url("icons/calendar.svg");
                      cursor: pointer;
                    }
                  `
                }
              />
            </HStack>

            <HStack spacing={2}>
              <Select
                name="status"
                value={transactionForm.status}
                onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
                placeholder="Status"
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop", opacity: 1 }}
              >
                <option value="deposit">À receber</option>
                <option value="withdraw">À pagar</option>
                <option value="overdue">Vencido</option>
                <option value="paid">Pago</option>
              </Select>

              <Select
                name="typeRecurrence"
                value={transactionForm.typeRecurrence}
                onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
                placeholder="Recorrência"
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop", opacity: 1 }}
              >
                <option value="every_1_week">A cada 1 semana</option>
                <option value="every_15_days">A cada 15 dias</option>
                <option value="monthly">Mensal</option>
                <option value="yearly">Anual</option>
                <option value="installments">Parcelas</option>
              </Select>

              {transactionForm.typeRecurrence === "installments" && (
                <Input
                  maxWidth="100px"
                  name="installments"
                  placeholder="Parcelas"
                  value={transactionForm.installments}
                  onChange={({ target }) => handleChangeTransactionForm(target.name, target.value)}
                  disabled={isDisabled}
                  type="number"
                  _disabled={{ cursor: "no-drop" }}
                />
              )}
            </HStack>

            <HStack spacing={2}>
              <CheckBoxCard
                type="deposit"
                label="Entrada"
                checkedType={transactionForm.type}
                onClick={(typeSelected) => handleChangeTransactionForm("type", typeSelected)}
                disabled={isDisabled}
              />

              <CheckBoxCard
                type="withdraw"
                label="Saída"
                checkedType={transactionForm.type}
                onClick={(typeSelected) => handleChangeTransactionForm("type", typeSelected)}
                disabled={isDisabled}
              />
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {(!dataToEdit || enableEditing) ? (
            <>
              <Button
                colorScheme="green"
                mr={3}
                onClick={handleSave}
                isLoading={createTransaction.isLoading || editTransaction.isLoading}
              >
                Salvar
              </Button>

              <Button onClick={onClose}>Cancelar</Button>
            </>
          ) : (
            <Button w="240px" mx="auto" onClick={() => setEnableEditing(true)}>Editar</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
