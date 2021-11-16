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
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
  onSaveEdit: (id: string, transaction: TransactionModelProps) => void
}

export function ModalTransaction({ dataToEdit, isOpen, onClose, onSave, onSaveEdit }: ModalTransactionProps) {
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

  const [enableEditing, setEnableEditing] = useState(false)
  const isDisabled = !!dataToEdit && !enableEditing

  useEffect(() => {
    if (dataToEdit) {
      const transitionToEdit: TransactionStateProps = {
        title: dataToEdit.title,
        amount: dataToEdit.amountDisplay,
        date: dataToEdit.date,
        type: dataToEdit.type,
      }

      setTransaction(transitionToEdit)
      setEnableEditing(false)
    } else {
      setTransaction(null)
    }
  }, [dataToEdit])

  const handleSave = () => {
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
      const newTransaction = generateTransactionToSave()
      if (newTransaction) onSave(newTransaction)
    } else {
      const modifiedTransaction = generateTransactionToSave()
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
        <ModalHeader>{!dataToEdit ? "Cadastrar uma Transação" : "Editar uma Transação"}</ModalHeader>
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
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                placeholder="Valor"
                value={transaction.amount}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
                disabled={isDisabled}
              />

              <Input
                name="date"
                placeholder="Data"
                value={transaction.date}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
                type="date"
                disabled={isDisabled}
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
                Save
              </Button>

              <Button onClick={onClose}>Cancel</Button>
            </>
          ) : (
            <Button w="240px" mx="auto" onClick={() => setEnableEditing(true)}>Editar</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
