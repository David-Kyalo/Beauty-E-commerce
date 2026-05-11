import { Request, Response, NextFunction } from 'express';
import mpesaService from '../payments/mpesa.service';
import prisma from '../lib/prisma';
import logger from '../utils/logger';
import { AppError } from '../utils/AppError';

export const initiatePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) throw new AppError('Order not found', 404);
    if (order.payment?.status === 'COMPLETED') throw new AppError('Already paid', 400);

    const mpesaResponse = await mpesaService.initiateStkPush(phoneNumber, amount, orderId);
    await prisma.payment.update({
      where: { orderId },
      data: { checkoutRequestId: mpesaResponse.CheckoutRequestID, phoneNumber }
    });

    res.status(200).json({ status: 'success', data: mpesaResponse });
  } catch (error) { next(error); }
};

export const mpesaCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const callbackData = req.body.Body.stkCallback;
    const { ResultCode, CheckoutRequestID, CallbackMetadata } = callbackData;

    const payment = await prisma.payment.findUnique({ where: { checkoutRequestId: CheckoutRequestID } });
    if (!payment || payment.status !== 'PENDING') return res.status(200).json({ ResultCode: 0 });

    if (ResultCode === 0) {
      const receipt = CallbackMetadata.Item.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;
      await prisma.$transaction([
        prisma.payment.update({ where: { id: payment.id }, data: { status: 'COMPLETED', transactionId: receipt } }),
        prisma.order.update({ where: { id: payment.orderId }, data: { status: 'PAID' } })
      ]);
    } else {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED' } });
    }
    res.status(200).json({ ResultCode: 0 });
  } catch (error) {
    logger.error('Callback error:', error);
    res.status(200).json({ ResultCode: 1 });
  }
};
