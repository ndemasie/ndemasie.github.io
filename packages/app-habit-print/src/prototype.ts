Date.prototype.startWeekDate = function (options?: { weekStartDay: number }) {
  const weekStartDay = options?.weekStartDay || 1
  // Offset for day to match the week start day
  const offset = (7 - weekStartDay) % 7

  return new Date(this.setDate(this.getDate() - offset)).getDate()
}

Date.prototype.endWeekDate = function (options?: { weekStartDay: number }) {
  return new Date().startWeekDate(options) + 7
}

Date.prototype.startMonth = function () {
  return new Date(new Date().getFullYear(), new Date().getMonth(), 0, 1)
}

Date.prototype.endMonth = function () {
  return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 1)
}
