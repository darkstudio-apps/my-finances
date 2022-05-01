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

interface IModalRecurrence {
  title: string
  onConfirmation: () => void
  onClose: () => void
}

export function ModalRecurrence({ title, onConfirmation, onClose }: IModalRecurrence) {
  const initialRef = useRef(null)

  const [value, setValue] = useState("1")

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={true}
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
            <Stack direction="row">
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancelar</Button>

          <Button
            colorScheme="red"
            mr={3}
            onClick={onConfirmation}
          // isLoading={onSave.isLoading || onSaveEdit.isLoading}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
