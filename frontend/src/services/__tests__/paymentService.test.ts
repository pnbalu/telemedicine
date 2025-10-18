import { paymentService } from '../paymentService';

describe('PaymentService', () => {
  test('should get payment methods', async () => {
    const methods = await paymentService.getPaymentMethods();
    expect(methods).toBeDefined();
    expect(Array.isArray(methods)).toBe(true);
    expect(methods.length).toBeGreaterThan(0);
  });

  test('should get payment history', async () => {
    const history = await paymentService.getPaymentHistory();
    expect(history).toBeDefined();
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBeGreaterThan(0);
  });

  test('should get payment statistics', async () => {
    const stats = await paymentService.getPaymentStats();
    expect(stats).toBeDefined();
    expect(stats.totalSpent).toBeGreaterThanOrEqual(0);
    expect(stats.monthlySpent).toBeGreaterThanOrEqual(0);
    expect(stats.totalTransactions).toBeGreaterThanOrEqual(0);
    expect(stats.successRate).toBeGreaterThanOrEqual(0);
    expect(stats.successRate).toBeLessThanOrEqual(100);
  });

  test('should validate card number', () => {
    expect(paymentService.validateCardNumber('4111111111111111')).toBe(true); // Valid Visa
    expect(paymentService.validateCardNumber('5555555555554444')).toBe(true); // Valid Mastercard
    expect(paymentService.validateCardNumber('1234567890123456')).toBe(false); // Invalid
    expect(paymentService.validateCardNumber('4111111111111112')).toBe(false); // Invalid checksum
  });

  test('should get card type from number', () => {
    expect(paymentService.getCardType('4111111111111111')).toBe('Visa');
    expect(paymentService.getCardType('5555555555554444')).toBe('Mastercard');
    expect(paymentService.getCardType('371449635398431')).toBe('American Express');
    expect(paymentService.getCardType('6011111111111117')).toBe('Discover');
  });
});
