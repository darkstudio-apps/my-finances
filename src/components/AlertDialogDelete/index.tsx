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

interface IAlertDialog {
  id: string
  title: string
  description: ReactNode
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string) => void
  onCancel: () => void
  isLoading: boolean
}

export function AlertDialogDelete({
  id,
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  onCancel,
  isLoading,
}: IAlertDialog) {
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

      <AlertDialogContent margin={6}>
        <AlertDialogHeader>
          {title}
        </AlertDialogHeader>

        <AlertDialogCloseButton />

        <AlertDialogBody>
          {description}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={onCancel} ref={cancelRef}>
            Não
          </Button>

          <Button
            colorScheme="red"
            ml={3}
            isLoading={isLoading}
            onClick={() => onSubmit(id)}
          >
            Sim
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
