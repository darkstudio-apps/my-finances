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
  useToast,
} from "@chakra-ui/react"

import { CheckBoxCard } from "../CheckBoxCard"
import { TransactionModelProps, TransactionTypeProps } from "../../hooks/useTransactions/transactions.type"
import { formatFloat, formatReal } from "../../utils/maskUtil"
import { parseToUTCandISO } from "../../utils/dateUtil"

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
}

interface TransactionStateProps {
  title: string
  amount: string
  date: string
  type: TransactionTypeProps | null
}

const transactionObjInitial: TransactionStateProps = {
  title: "",
  amount: "0,00",
  date: "",
  type: null,
}

export function ModalTransaction({ isOpen, onClose, onSave }: ModalTransactionProps) {
  const toast = useToast()

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

  const generateTransactionToSave = (): TransactionModelProps | null => {
    const includesString = Object.values(transaction).includes("")
    const amountZero = transaction.amount === "0,00"

    if (includesString || amountZero || transaction.type === null) {
      return null
    }

    const type: TransactionTypeProps = transaction.type

    const newTransaction: TransactionModelProps = {
      ...transaction,
      type,
      amount: formatFloat(transaction.amount),
      date: parseToUTCandISO(transaction.date),
    }

    return newTransaction
  }

  const handleSave = () => {
    const newTransaction = generateTransactionToSave()

    if (!newTransaction) {
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
