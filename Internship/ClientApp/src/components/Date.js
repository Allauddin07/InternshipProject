
function formatDate(Date) {
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //const d = Date.toString()
    const year = Date.getFullYear()
    const date = Date.getDate()
    const monthIndex = Date.getMonth()
    const monthName = months[Date.getMonth()]
    const dayName = days[Date.getDay()] // Thu
    const formatted = ` ${date}-${monthName}-${year}`
    return formatted.toString()
  }

  export default formatDate
  