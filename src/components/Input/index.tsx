import { forwardRef, ForwardRefRenderFunction } from "react"
import { FormLabel, FormControl, Input as ChakraInput, InputProps } from "@chakra-ui/react"

interface IInput extends InputProps {
  name: string
  label?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> =
  ({ name, label, ...rest }, ref) => {
    return (
      <FormControl>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

        <ChakraInput
          id={name}
          name={name}
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: "gray.900",
          }}
          size="lg"
          ref={ref}
          {...rest}
        />
      </FormControl>
    )
  }

export const Input = forwardRef(InputBase)
