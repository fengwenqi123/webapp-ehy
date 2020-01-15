// 获取当月第一天
export function getCurrentMonthFirst(date) {
  date.setDate(1)
  var month = parseInt(date.getMonth() + 1)
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return date.getFullYear() + '-' + month + '-' + day
}

// 获取当月最后一天
export function getCurrentMonthLast(date) {
  var currentMonth = date.getMonth()
  var nextMonth = ++currentMonth
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
  var oneDay = 1000 * 60 * 60 * 24
  var lastTime = new Date(nextMonthFirstDay - oneDay)
  var month = parseInt(lastTime.getMonth() + 1)
  var day = lastTime.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return (date.getFullYear() + '-' + month + '-' + day)
}
