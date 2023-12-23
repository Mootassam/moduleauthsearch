import moment from "moment";

class Dates {
  static datetime() {
    const formattedDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    return formattedDateTime;
  }

  static currentTime() {
    const currentTime = moment().format("HH:mm");
    return currentTime;
  }

  static datethank() {
    const currentDate = moment().format("DD MMM YYYY");
    return currentDate;
  }

  static lividate() {
    const dateTime = moment().format("YYYY/MM/DD");

    return dateTime;
  }


  static date(){ 
    const date = moment().format('DD-MM-YYYY') ;
    return date; 
  }


  static hangSeng() {
    const date = moment().format("DD/MM/YYYY");
    return date;
  }

  static chan() {
    const formattedDate = moment().format("M月D日 HH:mm");
    return formattedDate;
  }

  static fly2() {
    const formattedDateTime = moment().format("DD MMM YYYY HH:mm");
    return formattedDateTime;
  }

  static blue() {
    const currentDate = moment();
    const today = moment().startOf("day");

    let formattedDate;

    if (currentDate.isSame(today, "day")) {
      formattedDate = "Today, " + currentDate.format("DD MMM YYYY");
    } else {
      formattedDate = currentDate.format("DD MMM YYYY");
    } 
    return formattedDate
  }


  static generateRandomDateNumber() {
    const currentDate = moment();
    const formattedDate = currentDate.format('YYYYMMDD');
    return formattedDate;
  }

  static generatedate(){ 
    const date = moment().format('YYMMDD') 
    return date
  }

  static hangseng(){ 
    const date = moment().format('YYMDD') ;
    return date;
  }

  static getCurrentDate() {
    const currentDate = moment().format('DD MMM YYYY');
  
    return currentDate;
  }



}

export default Dates;
