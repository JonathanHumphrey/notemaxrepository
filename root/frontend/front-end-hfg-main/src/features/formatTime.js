export const formatUTCDate = (utcDate) => {
    let result = new Date(utcDate)
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let offset = new Date().getTimezoneOffset()
    let timeResult = result - offset * 60 * 1000
  
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: timeZone
    }
    const timeOptions = {
      timeStyle: 'short',
      timeZone: timeZone
    }
  
    const dateFormat = new Intl.DateTimeFormat('en-US', options)
    const timeFormat = new Intl.DateTimeFormat('en-US', timeOptions)
    result = `${dateFormat.format(result)} ${timeFormat.format(timeResult)}`
    return result
}
export default formatUTCDate;