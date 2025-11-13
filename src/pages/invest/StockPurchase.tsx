import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, TrendingUp, CreditCard, CheckCircle2 } from "lucide-react";
import { fampayGateway, formatCurrency, type PaymentRequest } from "@/lib/fampay";
import { toast } from "sonner";
import stocksData from "../../mock/stocks.json";

interface StockPurchaseProps {
  symbol?: string;
}

const StockPurchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { symbol, stock } = location.state || {};

  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [quantity, setQuantity] = useState<string>("1");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");

  useEffect(() => {
    // Find stock from trending or holdings
    if (stock) {
      setSelectedStock(stock);
    } else if (symbol) {
      const foundStock =
        stocksData.trending.find((s) => s.symbol === symbol) ||
        stocksData.portfolio.holdings.find((s) => s.symbol === symbol);
      if (foundStock) {
        setSelectedStock(foundStock);
      }
    } else {
      // Default to first trending stock
      setSelectedStock(stocksData.trending[0]);
    }
  }, [symbol, stock]);

  useEffect(() => {
    if (selectedStock && quantity) {
      const qty = parseFloat(quantity) || 0;
      const price = selectedStock.price || selectedStock.currentPrice || 0;
      setTotalAmount(qty * price);
    }
  }, [selectedStock, quantity]);

  const handleQuantityChange = (value: string) => {
    // Only allow positive numbers
    if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      setQuantity(value);
    }
  };

  const handlePayment = async () => {
    if (!selectedStock || !quantity || parseFloat(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      const orderId = fampayGateway.generateOrderId("STOCK");
      const stockSymbol = selectedStock.symbol || "UNKNOWN";
      const stockName = selectedStock.name || "Stock";

      const paymentRequest: PaymentRequest = {
        amount: totalAmount,
        currency: "INR",
        orderId,
        description: `Purchase ${quantity} shares of ${stockName} (${stockSymbol})`,
        customerName: "User", // In production, get from user context
        returnUrl: `${window.location.origin}/invest/payment/success`,
        metadata: {
          stockSymbol,
          stockName,
          quantity: parseFloat(quantity),
          pricePerShare: selectedStock.price || selectedStock.currentPrice,
          type: "stock_purchase",
        },
      };

      const response = await fampayGateway.initiatePayment(paymentRequest);

      if (response.success && response.paymentId) {
        // Store payment details for processing
        sessionStorage.setItem(
          "pending_stock_purchase",
          JSON.stringify({
            paymentId: response.paymentId,
            orderId: response.orderId,
            stock: selectedStock,
            quantity: parseFloat(quantity),
            totalAmount,
            timestamp: new Date().toISOString(),
          })
        );

        // Simulate payment processing
        setTimeout(() => {
          // In production, redirect to FamPay payment page
          // For now, simulate successful payment
          handlePaymentSuccess(response.paymentId, response.orderId);
        }, 2000);
      } else {
        throw new Error(response.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("failed");
      setIsProcessing(false);
      toast.error(error instanceof Error ? error.message : "Payment failed. Please try again.");
    }
  };

  const handlePaymentSuccess = async (paymentId: string, orderId: string) => {
    try {
      // Verify payment status
      const status = await fampayGateway.verifyPayment(paymentId);

      if (status.status === "success") {
        setPaymentStatus("success");
        toast.success("Payment successful! Processing your investment...");

        // Navigate to success page after a short delay
        setTimeout(() => {
          navigate("/invest/payment/success", {
            state: {
              paymentId,
              orderId,
              status: "success",
            },
          });
        }, 1500);
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("failed");
      setIsProcessing(false);
      toast.error("Payment verification failed. Please contact support.");
    }
  };

  if (!selectedStock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading stock information...</p>
        </div>
      </div>
    );
  }

  const stockPrice = selectedStock.price || selectedStock.currentPrice || 0;
  const changePercent = selectedStock.changePercent || 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-primary-foreground mb-1">Buy Stock</h1>
            <p className="text-primary-foreground/80 text-sm">Invest in stocks with FamPay</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Stock Information */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{selectedStock.name}</h2>
              <p className="text-muted-foreground mb-3">{selectedStock.symbol}</p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                  <p className="text-2xl font-bold">{formatCurrency(stockPrice, "INR")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-4 h-4 ${isPositive ? "text-success" : "text-destructive rotate-180"}`}
                    />
                    <p className={`text-lg font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
                      {isPositive ? "+" : ""}
                      {changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedStock.marketCap && (
            <Badge variant="secondary" className="text-xs">
              Market Cap: {selectedStock.marketCap}
            </Badge>
          )}
        </Card>

        {/* Purchase Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Purchase Details</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity (Shares)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                placeholder="Enter quantity"
                className="mt-2"
                disabled={isProcessing}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum: 1 share
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Price per share</span>
                <span className="font-semibold">{formatCurrency(stockPrice, "INR")}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-semibold">{quantity} shares</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(totalAmount, "INR")}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Status */}
        {paymentStatus === "processing" && (
          <Alert>
            <Loader2 className="w-4 h-4 animate-spin" />
            <AlertDescription>Processing payment with FamPay...</AlertDescription>
          </Alert>
        )}

        {paymentStatus === "success" && (
          <Alert className="border-success">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <AlertDescription className="text-success">
              Payment successful! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        {paymentStatus === "failed" && (
          <Alert variant="destructive">
            <AlertDescription>Payment failed. Please try again.</AlertDescription>
          </Alert>
        )}

        {/* Payment Button */}
        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            disabled={isProcessing || !quantity || parseFloat(quantity) <= 0 || totalAmount <= 0}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay with FamPay
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by FamPay
          </p>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            Your investment will be processed immediately after successful payment. 
            Stocks will be added to your portfolio within 1-2 business days.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StockPurchase;

