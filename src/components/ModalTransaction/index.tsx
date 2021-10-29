import { useRef, useState, ChangeEventHandler } from "react"
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
import { CheckBoxCard, CheckBoxTypeProps } from "../CheckBoxCard"

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
}

interface OnChangeProps {
  target: {
    name: string
    value: string
  }
}

export function ModalTransaction({ isOpen, onClose }: ModalTransactionProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [transaction, setTransaction] = useState({
    title: "",
    amount: 0,
    dateTransaction: "",
    category: "",
  })

  const [typeSelected, setTypeSelected] = useState<CheckBoxTypeProps | null>(null)

  const handleChangeType = (type: CheckBoxTypeProps) => {
    setTypeSelected(type)
  }

  const handleChangeTransaction = (event: OnChangeProps) => {
    const { name, value } = event.target
    setTransaction({
      ...transaction,
      [name]: value,
    })
  }

  const handleSave = () => {
    const transactionObj = {
      ...transaction,
      type: typeSelected,
    }

    console.log(transactionObj)
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
              value={transaction.title}
              placeholder="Nome"
              onChange={handleChangeTransaction}
              ref={initialRef}
            />

            <HStack spacing={2}>
              <Input
                name="amount"
                value={transaction.amount}
                placeholder="Preço"
                onChange={handleChangeTransaction}
                type="number"
              />

              <Input
                name="dateTransaction"
                value={transaction.dateTransaction}
                type="date"
                placeholder="Preço"
                onChange={handleChangeTransaction}
              />
            </HStack>

            <HStack spacing={2}>
              <CheckBoxCard
                label="Entrada"
                type="deposit"
                checkedType={typeSelected}
                onClick={handleChangeType}
              />

              <CheckBoxCard
                label="Saída"
                type="withdraw"
                checkedType={typeSelected}
                onClick={handleChangeType}
              />
            </HStack>

            <Input
              name="category"
              value={transaction.category}
              placeholder="Categoria"
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
