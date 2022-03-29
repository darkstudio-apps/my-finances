import { v4 as uuidv4 } from "uuid"

// TODO: verificar a possibilidade de trocar a lib uuid pelo Crypto.randomUUID que é nativo

export const uuid = (): string => uuidv4()
