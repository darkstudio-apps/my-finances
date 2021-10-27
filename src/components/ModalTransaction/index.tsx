import { useRef } from "react"
import { FiArrowUp, FiArrowDown } from "react-icons/fi"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  VStack,
  Icon,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react"
import { CheckBoxCard } from "../CheckBoxCard"

interface ModalTransactionProps {
  isOpen: boolean
  onClose: () => void
}

export function ModalTransaction({ isOpen, onClose }: ModalTransactionProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Transação</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Input ref={initialRef} placeholder="Nome" />

            <Input placeholder="Preço" />

            <HStack spacing={2}>
              <CheckBoxCard label="Entrada" icon="arrowUp"></CheckBoxCard>
              <CheckBoxCard label="Saída" icon="arrowDown"></CheckBoxCard>
            </HStack>

            <Input placeholder="Categoria" />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
