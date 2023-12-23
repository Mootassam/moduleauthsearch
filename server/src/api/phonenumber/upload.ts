import ApiResponseHandler from '../apiResponseHandler';
import phoneNumberService from '../../services/phoneNumber';

export default async (req, res, next) => {
  try {
    const payload = '';
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
