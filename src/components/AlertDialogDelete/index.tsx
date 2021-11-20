import { ReactNode, useRef } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react"

interface AlertDialogProps {
  id: string
  title: string
  description: ReactNode
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string) => void
  isLoading: boolean
}

export function AlertDialogDelete({ id, title, description, isOpen, onClose, onSubmit, isLoading }: AlertDialogProps) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {description}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose} ref={cancelRef}>
            Não
          </Button>
          <Button onClick={() => onSubmit(id)} colorScheme="red" ml={3} isLoading={isLoading}>
            Sim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
