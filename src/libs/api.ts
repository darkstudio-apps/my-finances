import axios from "axios"

// TODO: modificar o nome para apiClient
export const api = axios.create({
  baseURL: "api",
})
