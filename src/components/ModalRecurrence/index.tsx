import { useEffect, useRef, useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react"
import { ITransactionRequestQueryAction } from "models/transactions"

interface IModalRecurrence {
  isOpen: boolean
  title: string
  titleBtnConfirm?: string
  onClose: () => void
  onSubmit: (action: ITransactionRequestQueryAction) => void
  onCancel: () => void
  options: {
    current: string
    next?: string
    all?: string
  }
  colorScheme?: string
  isLoading?: boolean
}

export function ModalRecurrence({
  isOpen,
  title,
  titleBtnConfirm,
  onClose,
  onSubmit,
  onCancel,
  options,
  colorScheme,
  isLoading,
}: IModalRecurrence) {
  const initialRef = useRef(null)

  const [action, setAction] = useState("current")

  useEffect(() => {
    setAction("current")
  }, [isOpen])

  const { current, next, all } = options

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
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={4}>
          <RadioGroup onChange={setAction} value={action}>
            <Stack>
              {current && <Radio value="current">{current}</Radio>}
              {next && <Radio value="next">{next}</Radio>}
              {all && <Radio value="all">{all}</Radio>}
            </Stack>
          </RadioGroup>
        </ModalBody>

        <Stack as={ModalFooter} spacing={4} isInline>
          <Button onClick={onCancel}>Cancelar</Button>

          <Button
            colorScheme={colorScheme ? colorScheme : "green"}
            mr={3}
            onClick={() => onSubmit(action as ITransactionRequestQueryAction)}
            isLoading={isLoading}
          >
            {titleBtnConfirm ? titleBtnConfirm : "Salvar"}
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  )
}
