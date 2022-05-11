import { useRef, useState } from "react"
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
  onSubmit: (value: ITransactionRequestQueryAction) => void
  onClose: () => void
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
  onSubmit,
  onClose,
  options,
  colorScheme,
  isLoading,
}: IModalRecurrence) {
  const initialRef = useRef(null)

  const [value, setValue] = useState("current")

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
          <RadioGroup onChange={setValue} value={value}>
            <Stack>
              {current && <Radio value="current">{current}</Radio>}
              {next && <Radio value="next">{next}</Radio>}
              {all && <Radio value="all">{all}</Radio>}
            </Stack>
          </RadioGroup>
        </ModalBody>

        <Stack as={ModalFooter} spacing={4} isInline>
          <Button onClick={onClose}>Cancelar</Button>

          <Button
            colorScheme={colorScheme ? colorScheme : "green"}
            mr={3}
            onClick={() => onSubmit(value as ITransactionRequestQueryAction)}
            isLoading={isLoading}
          >
            {titleBtnConfirm ? titleBtnConfirm : "Salvar"}
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  )
}
