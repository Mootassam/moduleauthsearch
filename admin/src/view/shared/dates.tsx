import moment from 'moment';
export default class Dates {
  static formatDate(date) {
    if (date) {
      return moment(date).format('DD-MM-YY HH:MM:SS');
    } else {
      return '___';
    }
  }
}
