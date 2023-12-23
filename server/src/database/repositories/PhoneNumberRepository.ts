import Error400 from '../../errors/Error400';
import phoneNumber from '../models/phoneNumber';
import { IRepositoryOptions } from './IRepositoryOptions';
import fs from 'fs';
import multer, { Multer } from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
class PhoneNumberRepositopry {
  static async saveNumber(
    number,
    options: IRepositoryOptions,
  ) {
    const data = {
      number: number,
    };
    const payload = await phoneNumber(
      options.database,
    ).create(data);
    return payload;
  }

  static Finduplicate(number, options: IRepositoryOptions) {
    if (!number) return;
    const data = phoneNumber(options.database).findOne({
      number: number,
    });
    return data;
  }

  static async checkDuplicate(
    data,
    options: IRepositoryOptions,
  ) {
    let duplicateNumber = 0;
    let newNumber = 0;
    let arrayDuplicateNumber: number[] = [];

    if (!data) return;

    for (
      let index = 0;
      index < data?.data?.length;
      index++
    ) {
      const number = Number(data?.data[index]);

      // Check if the value is a number and not an empty string
      if (
        !isNaN(number) &&
        data.data[index].trim() !== ''
      ) {
        const isExist = await this.Finduplicate(
          number,
          options,
        );

        if (isExist) {
          duplicateNumber += 1;
          arrayDuplicateNumber.push(
            Number(data?.data[index]),
          );
        }

        if (!isExist) {
          await this.saveNumber(number, options);
          newNumber += 1;
        }
      } else {
        throw new Error400('File should be content Number');
      }
    }

    return {
      duplicateNumber,
      newNumber,
      arrayDuplicateNumber,
    };
  }

  static async uploadFile(req) {
    let data: string[] = [];
    return new Promise((resolve, reject) => {
      // Check if 'file' is the correct field name in your form
      upload.single('file')(req, null, async (err) => {
        if (err) {
          console.error('Error uploading file:', err);
          reject(err);
        } else {
          if (req.file) {
            const fileBuffer = req.file.buffer;

            const csvData = fileBuffer.toString('utf-8');
            const phoneNumbers: string[] = csvData
              .split('\n')
              .slice(1)
              .map((line: string) => line.trim());
            for (const iterator of phoneNumbers) {
              if (iterator.trim() !== '') {
                data.push(iterator);
              }
            }
            resolve({ success: true, data });
          } else {
            // Handle the case when 'req.file' is not defined
            return reject(new Error('No file Uploaded'));
          }
        }
      });
    });
  }
}

export default PhoneNumberRepositopry;
