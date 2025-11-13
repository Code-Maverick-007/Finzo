import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, TrendingUp, Home } from "lucide-react";
import { fampayGateway, formatCurrency } from "@/lib/fampay";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId, orderId } = location.state || {};

  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPaymentDetails = async () => {
      try {
        // Get payment details from sessionStorage
        const pendingPurchase = sessionStorage.getItem("pending_stock_purchase");
        if (pendingPurchase) {
          const purchase = JSON.parse(pendingPurchase);
          setPaymentDetails(purchase);

          // Verify payment status
          if (paymentId) {
            try {
              const status = await fampayGateway.verifyPayment(paymentId);
              if (status.status === "success") {
                // Clear pending purchase
                sessionStorage.removeItem("pending_stock_purchase");
                toast.success("Investment confirmed!");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading payment details:", error);
        setIsLoading(false);
      }
    };

    loadPaymentDetails();
  }, [paymentId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">Payment Successful</h1>
        <p className="text-primary-foreground/80">Your investment is being processed</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
        </div>

        {/* Payment Details */}
        {paymentDetails && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Investment Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-semibold">
                  {paymentDetails.stock?.name} ({paymentDetails.stock?.symbol})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-semibold">{paymentDetails.quantity} shares</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price per share</span>
                <span className="font-semibold">
                  {formatCurrency(
                    paymentDetails.stock?.price || paymentDetails.stock?.currentPrice || 0,
                    "INR"
                  )}
                </span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(paymentDetails.totalAmount, "INR")}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Transaction Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Information</h2>
          <div className="space-y-3">
            {orderId && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment ID</span>
                <span className="font-mono text-sm">{paymentId}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-semibold">FamPay</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 gradient-card">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your stocks will be added to your portfolio within 1-2 business days</li>
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Track your investment performance in the Investments section</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/invest")}
            className="w-full h-12 text-lg"
            size="lg"
          >
            View My Investments
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

