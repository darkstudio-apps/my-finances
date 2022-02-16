const transactionsJson = require("./transactions.json")
const fs = require("fs")

const parseToBRdateHackUTC = (dateUTC) => {
  const date = new Date(dateUTC)

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()

  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  const dateMillisecondsUTC = Date.UTC(year, month, day, hours, minutes, seconds)

  return new Date(dateMillisecondsUTC).toISOString()
}

const logFileName = `transactions-${Date.now()}.json`

const transactionsMapped = transactionsJson.map(transaction => {
  const {
    date: currentDate,
    id: idTransaction,
    ...rest
  } = transaction

  const dateAdjusted = parseToBRdateHackUTC(currentDate)

  const isRecurrence = transaction.typeRecurrence !== ""

  const transactionMapped = {
    ...rest,
    date: dateAdjusted,
    isRecurrence,
  }

  return transactionMapped
})

fs.writeFileSync(`./json/${logFileName}`, JSON.stringify(transactionsMapped, null, 2))
