import { useRef } from "react"
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
import { TransactionModelProps } from "../../hooks/useTransactions/transactions.type"
import { useModalTransaction } from "./useModalTransaction"

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
}

export function ModalTransaction({ isOpen, onClose, onSave }: ModalTransactionProps) {
  const toast = useToast()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const {
    transaction,
    handleChangeTransaction,
    generateTransactionToSave,
    clearState,
  } = useModalTransaction()

  const handleSave = () => {
    const newTransaction = generateTransactionToSave()

    if (newTransaction === null) {
      return toast({
        title: "Campos obrigatórios",
        description: "Todos os campos devem ser preenchidos.",
        status: "warning",
        position: "top",
        duration: 4000,
        isClosable: true,
      })
    }

    onSave(newTransaction)
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
        <ModalHeader>Cadastrar Transação</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Input
              name="title"
              placeholder="Nome"
              value={transaction.title}
              onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
              ref={initialRef}
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                placeholder="Valor"
                value={transaction.amount}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
              />

              <Input
                name="date"
                placeholder="Data"
                value={transaction.date}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
                type="date"
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
              />

              <CheckBoxCard
                type="withdraw"
                label="Saída"
                checkedType={transaction.type}
                onClick={(typeSelected) => handleChangeTransaction("type", typeSelected)}
              />
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>

          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
