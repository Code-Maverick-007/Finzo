/**
 * FamPay Payment Gateway Integration
 * Handles payment processing for stock investments
 */

export interface PaymentRequest {
  amount: number;
  currency?: string;
  orderId: string;
  description: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  returnUrl: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
  message?: string;
  paymentUrl?: string;
  transactionId?: string;
}

export interface PaymentStatus {
  paymentId: string;
  orderId: string;
  status: 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  timestamp: string;
  transactionId?: string;
}

class FamPayGateway {
  private apiKey: string;
  private baseUrl: string;
  private isTestMode: boolean;

  constructor() {
    // In production, these should come from environment variables
    // See .env.example for configuration
    this.apiKey = import.meta.env.VITE_FAMPAY_API_KEY || 'test_api_key_12345';
    this.baseUrl = import.meta.env.VITE_FAMPAY_BASE_URL || 'https://api.fampay.in/v1';
    this.isTestMode = import.meta.env.VITE_FAMPAY_TEST_MODE === 'true' || true;
    
    if (!this.isTestMode && !this.apiKey) {
      console.warn('FamPay API key is missing. Please set VITE_FAMPAY_API_KEY in your .env file');
    }
  }

  /**
   * Initialize a payment transaction
   */
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Simulate API call - In production, replace with actual FamPay API call
      const response = await this.simulatePaymentInitiation(request);
      
      return {
        success: true,
        paymentId: response.paymentId,
        orderId: request.orderId,
        amount: request.amount,
        status: 'pending',
        paymentUrl: response.paymentUrl,
        message: 'Payment initiated successfully',
      };
    } catch (error) {
      console.error('FamPay payment initiation error:', error);
      return {
        success: false,
        orderId: request.orderId,
        amount: request.amount,
        status: 'failed',
        message: error instanceof Error ? error.message : 'Payment initiation failed',
      };
    }
  }

  /**
   * Verify payment status
   */
  async verifyPayment(paymentId: string): Promise<PaymentStatus> {
    try {
      // Simulate API call - In production, replace with actual FamPay API call
      const status = await this.simulatePaymentVerification(paymentId);
      return status;
    } catch (error) {
      console.error('FamPay payment verification error:', error);
      throw error;
    }
  }

  /**
   * Process payment callback (webhook handler)
   */
  async handleCallback(data: any): Promise<PaymentStatus> {
    try {
      // Verify webhook signature in production
      return {
        paymentId: data.paymentId || data.payment_id,
        orderId: data.orderId || data.order_id,
        status: this.mapStatus(data.status),
        amount: data.amount,
        currency: data.currency || 'INR',
        timestamp: new Date().toISOString(),
        transactionId: data.transactionId || data.transaction_id,
      };
    } catch (error) {
      console.error('FamPay callback handling error:', error);
      throw error;
    }
  }

  /**
   * Simulate payment initiation (for development)
   * 
   * PRODUCTION: Replace this with actual FamPay API call:
   * 
   * const response = await fetch(`${this.baseUrl}/payments/initiate`, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${this.apiKey}`,
   *   },
   *   body: JSON.stringify({
   *     amount: request.amount,
   *     currency: request.currency || 'INR',
   *     order_id: request.orderId,
   *     description: request.description,
   *     customer: {
   *       name: request.customerName,
   *       email: request.customerEmail,
   *       phone: request.customerPhone,
   *     },
   *     return_url: request.returnUrl,
   *     metadata: request.metadata,
   *   }),
   * });
   * 
   * const data = await response.json();
   * return {
   *   paymentId: data.payment_id,
   *   paymentUrl: data.payment_url,
   * };
   */
  private async simulatePaymentInitiation(
    request: PaymentRequest
  ): Promise<{ paymentId: string; paymentUrl: string }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const paymentId = `fampay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const paymentUrl = `/payment/process/${paymentId}`;

    // Store payment in sessionStorage for simulation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        `fampay_payment_${paymentId}`,
        JSON.stringify({
          ...request,
          paymentId,
          status: 'pending',
          createdAt: new Date().toISOString(),
        })
      );
    }

    return { paymentId, paymentUrl };
  }

  /**
   * Simulate payment verification (for development)
   * Replace with actual FamPay API call in production
   */
  private async simulatePaymentVerification(paymentId: string): Promise<PaymentStatus> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check sessionStorage for payment status
    if (typeof window !== 'undefined') {
      const paymentData = sessionStorage.getItem(`fampay_payment_${paymentId}`);
      if (paymentData) {
        const data = JSON.parse(paymentData);
        return {
          paymentId: data.paymentId,
          orderId: data.orderId,
          status: data.status || 'pending',
          amount: data.amount,
          currency: data.currency || 'INR',
          timestamp: data.createdAt || new Date().toISOString(),
          transactionId: data.transactionId,
        };
      }
    }

    throw new Error('Payment not found');
  }

  /**
   * Map external status to internal status
   */
  private mapStatus(status: string): PaymentStatus['status'] {
    const statusMap: Record<string, PaymentStatus['status']> = {
      pending: 'pending',
      processing: 'processing',
      success: 'success',
      completed: 'success',
      failed: 'failed',
      cancelled: 'cancelled',
      error: 'failed',
    };

    return statusMap[status.toLowerCase()] || 'pending';
  }

  /**
   * Generate order ID
   */
  generateOrderId(prefix: string = 'ORD'): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}

// Export singleton instance
export const fampayGateway = new FamPayGateway();

// Export utility functions
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

