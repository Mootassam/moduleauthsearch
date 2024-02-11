import PhoneNumberRepositopry from '../database/repositories/PhoneNumberRepository';
import Error402 from '../errors/Error402';

class phoneNumberService {
  static async saveNumber(number, options) {
    try {
      const data =
        await PhoneNumberRepositopry.Finduplicate(
          number,
          options,
        );
      if (data) {
        throw new Error402('号码已存在');
      }
      const payload =
        await PhoneNumberRepositopry.saveNumber(
          number,
          options,
        );
      return payload;
    } catch (error) {
      throw error;
    }
  }

  static async checkNumber(number, options) {
    try {
      const data =
        await PhoneNumberRepositopry.Finduplicate(
          number,
          options,
        );
      if (data) {
        throw new Error402('号码已存在');
      }
      const payload = '号码不存在';
      return payload;
    } catch (error) {
      throw error;
    }
  }

  static async uploadNumber(req, options) {
    let number;
    try {
      const payload =
        await PhoneNumberRepositopry.uploadFile(req);
      if (payload) {
        number =
          await PhoneNumberRepositopry.checkDuplicate(
            payload,
            options,
          );
      }
      return number;
    } catch (error) {
      throw error;
    }
  }
}

export default phoneNumberService;
