import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const OtpLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setOtpSent(true);
      toast.success("OTP sent to your phone");
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Please enter valid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ArrowRight className="w-8 h-8 text-primary-foreground rotate-[-45deg]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground text-base">
            {otpSent ? "Enter the OTP sent to your phone" : "Enter your phone number to continue"}
          </p>
        </div>

        <div className="space-y-6">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <Button
                onClick={handleSendOtp}
                size="lg"
                className="w-full rounded-full"
              >
                Send OTP
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <Label>Enter 6-digit OTP</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <Button
                onClick={handleVerifyOtp}
                size="lg"
                className="w-full rounded-full"
              >
                Verify & Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => setOtpSent(false)}
                variant="outline"
                className="w-full rounded-full"
              >
                Change Number
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
