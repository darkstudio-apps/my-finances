import { addDays, addMonths, addYears, isBefore } from "date-fns"

export const dateAddDays = (date: string, daysAdd: number) => {
  const dateFuture = addDays(new Date(date), daysAdd)
  return dateFuture.toISOString()
}

export const dateAddMonths = (date: string, monthsAdd: number) => {
  const dateFuture = addMonths(new Date(date), monthsAdd)
  return dateFuture.toISOString()
}

export const dateAddYears = (date: string, yearsAdd: number) => {
  const dateFuture = addYears(new Date(date), yearsAdd)
  return dateFuture.toISOString()
}

export const dateIsBefore = (currentDate: string, futureDate: string) => {
  const _isBefore = isBefore(new Date(currentDate), new Date(futureDate))
  return _isBefore
}

export const parseToUTCandISO = (dateYearMonthDay: string, hourOffset?: "start" | "end") => {
  const dateNow = new Date()
  const [year, month, day] = dateYearMonthDay.split("-")

  dateNow.setFullYear(Number(year))
  dateNow.setMonth(Number(month) - 1)
  dateNow.setDate(Number(day))

  if (hourOffset === "start") {
    dateNow.setHours(0)
    dateNow.setMinutes(0)
    dateNow.setSeconds(0)
  }

  if (hourOffset === "end") {
    dateNow.setHours(23)
    dateNow.setMinutes(59)
    dateNow.setSeconds(59)
  }

  return dateNow.toISOString()
}

export const parseYearMonthDay = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDay(dateUTC)
  return `${year}-${month}-${day}`
}

export const parseDateBr = (dateUTC: string) => {
  const { year, month, day } = getObjYearMonthDay(dateUTC)
  return `${day}/${month}/${year}`
}

export const getObjYearMonthDay = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date()

  let year = String(date.getFullYear())

  let monthNumber = date.getMonth() + 1
  let month = (monthNumber < 10) ? `0${monthNumber}` : String(monthNumber)

  let dayNumber = date.getDate()
  let day = (dayNumber < 10) ? `0${dayNumber}` : String(dayNumber)

  return { year, month, day }
}
