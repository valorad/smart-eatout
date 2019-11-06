export class DateForm {

  isDateValid = (date: Date) => {
    return !isNaN( date.getTime() )
  }

  round = (date: Date) => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }

}