import { useRef, useState } from "react"
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
} from "@chakra-ui/react"

import { CheckBoxCard } from "../CheckBoxCard"
import { TransactionModelProps, TransactionTypeProps } from "../../hooks/useTransactions/transactions.type"
import { formatFloat, formatReal } from "../../utils/maskUtil"

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
}

interface TransactionStateProps {
  title: string
  amount: string
  date: string
  type: TransactionTypeProps
}

const transactionObjInitial: TransactionStateProps = {
  title: "",
  amount: "",
  date: "",
  type: "deposit",
}

export function ModalTransaction({ isOpen, onClose, onSave }: ModalTransactionProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [transaction, setTransaction] = useState<TransactionStateProps>(transactionObjInitial)

  const handleChangeTransaction = (prop: string, value: string) => {
    if (prop === "amount") value = formatReal(value)

    setTransaction({
      ...transaction,
      [prop]: value,
    })
  }

  const handleSave = () => {
    const newTransaction: TransactionModelProps = {
      ...transaction,
      amount: formatFloat(transaction.amount),
    }

    // TODO: validar os dados

    onSave(newTransaction)
    onClose()
    clearTransaction()
  }

  const clearTransaction = () => {
    setTransaction(transactionObjInitial)
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
                placeholder="Preço"
                value={transaction.amount}
                onChange={({ target }) => handleChangeTransaction(target.name, target.value)}
              />

              <Input
                name="date"
                placeholder="Preço"
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
