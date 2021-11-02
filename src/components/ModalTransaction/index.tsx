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

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionModelProps) => void
}

interface OnChangeProps { // TODO: remover isso e fazer certo
  target: {
    name: string
    value: string
  }
}

const transactionObjInitial: TransactionModelProps = {
  title: "",
  amount: 0,
  date: "",
  category: "",
  type: "deposit",
}

export function ModalTransaction({ isOpen, onClose, onSave }: ModalTransactionProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [transaction, setTransaction] = useState<TransactionModelProps>(transactionObjInitial)

  const handleChangeType = (type: TransactionTypeProps) => {
    setTransaction({
      ...transaction,
      type,
    })
  }

  const handleChangeTransaction = (event: OnChangeProps) => {
    const { name, value } = event.target
    setTransaction({
      ...transaction,
      [name]: value,
    })
  }

  const handleSave = () => {
    // TODO: validar os dados

    onSave(transaction)
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
              onChange={handleChangeTransaction}
              ref={initialRef}
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                placeholder="Preço"
                value={transaction.amount}
                onChange={handleChangeTransaction}
                type="number"
              />

              <Input
                name="date"
                placeholder="Preço"
                value={transaction.date}
                onChange={handleChangeTransaction}
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
                onClick={handleChangeType}
              />

              <CheckBoxCard
                type="withdraw"
                label="Saída"
                checkedType={transaction.type}
                onClick={handleChangeType}
              />
            </HStack>

            <Input
              name="category"
              placeholder="Categoria"
              value={transaction.category}
              onChange={handleChangeTransaction}
            />
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
