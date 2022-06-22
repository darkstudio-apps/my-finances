import { transactionRepositoryFind } from "../transactionRepository"
import {
  dateNowYearMonthDay,
  endOfMonthInYearMonthDay,
  generateDecimalNumberInString,
  getObjYearMonthDay,
  parseToUTCandISO,
} from "utils/dateUtil"
import { ITransactionServiceList } from "../types/transactionService.type"
import { ITransactionListResponse } from "../types/transactionResponse.type"

export async function transactionServiceList({
  idUser,
  month,
  year,
}: ITransactionServiceList): Promise<ITransactionListResponse> {
  const dateYearMonthDay = dateNowYearMonthDay()
  const dateNow = getObjYearMonthDay(dateYearMonthDay)

  const dateMonthNumber = Number(month ? month : dateNow.month)
  const dateMonth = generateDecimalNumberInString(dateMonthNumber)
  const dateYear = year ? year : dateNow.year

  const dateStart = `${dateYear}-${dateMonth}-01`
  const dateEnd = endOfMonthInYearMonthDay(dateStart)

  const dateStartISO = parseToUTCandISO(dateStart, "start")
  const dateEndISO = parseToUTCandISO(dateEnd, "end")

  const transactions = await transactionRepositoryFind({ idUser, dateStartISO, dateEndISO })

  const transactionsData: ITransactionListResponse = {
    search: {
      dateStart: dateStartISO || "",
      dateEnd: dateEndISO || "",
    },
    length: transactions?.length || 0,
    data: transactions || [],
  }

  return transactionsData
}
