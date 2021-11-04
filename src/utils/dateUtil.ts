export const parseToUTCandISO = (dateYearMonthDay: string) => {
  const dateNow = new Date()
  const [year, month, day] = dateYearMonthDay.split("-")

  dateNow.setFullYear(Number(year))
  dateNow.setMonth(Number(month) - 1)
  dateNow.setDate(Number(day))

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

// ---------- helpers ----------

const getObjYearMonthDay = (dateString: string) => {
  const date = new Date(dateString)

  let year = String(date.getFullYear())

  let monthNumber = date.getMonth() + 1
  let month = (monthNumber < 10) ? `0${monthNumber}` : String(monthNumber)

  let dayNumber = date.getDate()
  let day = (dayNumber < 10) ? `0${dayNumber}` : String(dayNumber)

  return { year, month, day }
}
