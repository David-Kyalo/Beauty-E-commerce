import axios from 'axios';
import { config } from '../config/config';
import logger from '../utils/logger';
import { AppError } from '../utils/AppError';

class MpesaService {
  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${config.mpesa.consumerKey}:${config.mpesa.consumerSecret}`).toString('base64');
    try {
      const response = await axios.get(`${config.mpesa.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, { headers: { Authorization: `Basic ${auth}` } });
      return response.data.access_token;
    } catch (error: any) {
      logger.error('M-Pesa Token Error:', error.response?.data || error.message);
      throw new AppError('M-Pesa Auth failed', 500);
    }
  }

  public async initiateStkPush(phoneNumber: string, amount: number, orderId: string) {
    const accessToken = await this.getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${config.mpesa.shortCode}${config.mpesa.passKey}${timestamp}`).toString('base64');

    let formattedPhone = phoneNumber.replace(/\+/g, '');
    if (formattedPhone.startsWith('0')) formattedPhone = `254${formattedPhone.slice(1)}`;
    if (!/^254(7|1)\d{8}$/.test(formattedPhone)) throw new AppError('Invalid phone number', 400);

    const data = {
      BusinessShortCode: config.mpesa.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: config.mpesa.shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: config.mpesa.callbackUrl,
      AccountReference: orderId,
      TransactionDesc: `Order ${orderId}`,
    };

    try {
      const response = await axios.post(`${config.mpesa.baseUrl}/mpesa/stkpush/v1/processrequest`, data, { headers: { Authorization: `Bearer ${accessToken}` }, timeout: 30000 });
      return response.data;
    } catch (error: any) {
      logger.error('STK Push Error:', error.response?.data || error.message);
      throw new AppError(error.response?.data?.errorMessage || 'STK Push failed', 500);
    }
  }

  public async queryStkStatus(checkoutRequestId: string) {
    const accessToken = await this.getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${config.mpesa.shortCode}${config.mpesa.passKey}${timestamp}`).toString('base64');

    const data = { BusinessShortCode: config.mpesa.shortCode, Password: password, Timestamp: timestamp, CheckoutRequestID: checkoutRequestId };
    try {
      const response = await axios.post(`${config.mpesa.baseUrl}/mpesa/stkpushquery/v1/query`, data, { headers: { Authorization: `Bearer ${accessToken}` } });
      return response.data;
    } catch (error: any) {
      logger.error('M-Pesa Query Error:', error.response?.data || error.message);
      throw new AppError('Payment query failed', 500);
    }
  }
}

export default new MpesaService();
