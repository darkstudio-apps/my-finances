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

import { CheckBoxCard } from "../CheckBoxCard"
import { TransactionModelProps, } from "../../hooks/useTransactions/transaction.types"
import { TransactionStateProps, useModalTransaction } from "./useModalTransaction"
import { TransactionProps } from "../../hooks/useTransactions"

interface ModalTransactionProps {
  dataToEdit?: TransactionProps | null
  editMode: boolean
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
  onSaveEdit: (id: string, transaction: TransactionModelProps) => void
}

export function ModalTransaction({ dataToEdit, editMode, isOpen, onClose, onSave, onSaveEdit }: ModalTransactionProps) {
  const toast = useToast()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const {
    transaction,
    setTransaction,
    handleChangeTransaction,
    validateTransaction,
    generateTransactionToSave,
    clearState,
  } = useModalTransaction()

  useEffect(() => {
    if (dataToEdit) {
      const transitionToEdit: TransactionStateProps = {
        title: dataToEdit.title,
        amount: dataToEdit.amountDisplay,
        date: dataToEdit.date,
        status: dataToEdit.status,
        recurrence: dataToEdit.recurrence,
        type: dataToEdit.type,
      }

      setTransaction(transitionToEdit)
      setEnableEditing(false)
    } else {
      setTransaction(null)
    }
  }, [dataToEdit])

  const [enableEditing, setEnableEditing] = useState(false)
  useEffect(() => {
    setEnableEditing(editMode)
  }, [editMode])

  const isDisabled = !!dataToEdit && !editMode

  const handleSave = async () => {
    const isValid = validateTransaction()

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
      const newTransaction = await generateTransactionToSave()
      if (newTransaction) onSave(newTransaction)
    } else {
      const modifiedTransaction = await generateTransactionToSave()
      if (modifiedTransaction) onSaveEdit(dataToEdit.id, modifiedTransaction)
    }

    onClose()
    clearState()
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
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
              value={transaction.title}
              onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
              ref={initialRef}
              disabled={isDisabled}
              _disabled={{ cursor: "no-drop" }}
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                placeholder="Valor"
                value={transaction.amount}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop" }}
              />

              <Input
                name="date"
                placeholder="Data"
                value={transaction.date}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
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
                value={transaction.status}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
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
                name="recurrence"
                value={transaction.recurrence}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
                placeholder="Recorrência"
                disabled={isDisabled}
                _disabled={{ cursor: "no-drop", opacity: 1 }}
              >
                <option value="every-1-week">A cada 1 semana</option>
                <option value="every-15-days">A cada 15 dias</option>
                <option value="monthly">Mensal</option>
                <option value="yearly">Anual</option>
              </Select>
            </HStack>

            <HStack spacing={2}>
              <CheckBoxCard
                type="deposit"
                label="Entrada"
                checkedType={transaction.type}
                onClick={(typeSelected) => handleChangeTransaction("type", typeSelected)}
                disabled={isDisabled}
              />

              <CheckBoxCard
                type="withdraw"
                label="Saída"
                checkedType={transaction.type}
                onClick={(typeSelected) => handleChangeTransaction("type", typeSelected)}
                disabled={isDisabled}
              />
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {(!dataToEdit || enableEditing) ? (
            <>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
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
