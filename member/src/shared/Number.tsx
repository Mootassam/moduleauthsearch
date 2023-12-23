class Number {
  static HongKong(amount) {
    const hongkongCurrency = amount.toLocaleString("en-HK", {
      style: "currency",
      currency: "HKD",
    });
    return hongkongCurrency;
  }

  static generateRandom4Number() {
    const min = 1000; // Minimum four-digit number (inclusive)
    const max = 9999; // Maximum four-digit number (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  static generateRandom9Number() {
    const min = 100000000;
    const max = 999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  static genrateRandom6Number() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
  static generateRandom8Number() {
    const min = 10000000;
    const max = 99999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  static generateRandom7Number(){ 
    const min = 1000000;
    const max = 9999999; 
    const randomNumber  =  Math.floor(Math.random() * (max - min +1) ) + min;
    return randomNumber
  }

  static getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  static hongkong(amount) { 
    const exchangeRate = 1; // Replace with the actual exchange rate
    const hkdAmount = amount * exchangeRate;
    return hkdAmount.toLocaleString('en-HK', {
      style: 'currency',
      currency: 'HKD',
    }).replace('HK$', '');
  }

  static hongkongstyle2(amount){ 
    const exchangeRate = 1; // Replace with the actual exchange rate
    const hkdAmount = amount * exchangeRate;
    const formattedAmount = hkdAmount.toFixed(2);
    return formattedAmount;
  }

  static generate4RandomNumber(){ 
    const min = 1000; 
    const max = 9999; 
    const randomNumber = Math.floor(Math.random() *  (max - min + 1 )) + min; 
    return randomNumber
  }

  static generate3RandomNumber(){ 
    const min = 100; 
    const max = 999; 
    const randomNumber = Math.floor(Math.random() *  (max - min + 1 )) + min; 
    return randomNumber
  }




  }

export default Number;
