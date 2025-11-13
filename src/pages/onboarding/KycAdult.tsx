import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const KycAdult = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    panNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !formData.fullName || !formData.email || !formData.panNumber) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("KYC submitted successfully!");
    setTimeout(() => navigate("/onboarding/otp"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
            Complete Your KYC
          </h1>
          <p className="text-primary-foreground/80 text-base">
            Verify your identity to unlock all features
          </p>
        </div>

        <Card className="p-6 bg-background/95 backdrop-blur-sm border-primary-foreground/20">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="rounded-xl border-accent/20 focus:border-accent bg-accent/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-xl border-accent/20 focus:border-accent bg-accent/5"
            />
          </div>

          <div className="space-y-2">
            <Label>Date of Birth *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-xl",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number *</Label>
            <Input
              id="panNumber"
              placeholder="ABCDE1234F"
              value={formData.panNumber}
              onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
              className="rounded-xl border-accent/20 focus:border-accent bg-accent/5"
              maxLength={10}
            />
            <p className="text-xs text-muted-foreground">10-character PAN card number</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Upload PAN Card *</Label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-accent transition-colors cursor-pointer bg-accent/5 hover:bg-accent/10">
                <Upload className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Click to upload PAN Card
                </p>
                <p className="text-xs text-muted-foreground">
                  Front side of PAN card required
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Government ID *</Label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-primary/5 hover:bg-primary/10">
                <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Aadhaar, Passport, or Driver's License
                </p>
                <p className="text-xs text-muted-foreground">
                  Front and back side required for Aadhaar
                </p>
              </div>
            </div>
          </div>

            <Button type="submit" size="lg" className="w-full rounded-full">
              Submit KYC
            </Button>

            <Button
              type="button"
              onClick={() => navigate("/onboarding/type")}
              variant="outline"
              className="w-full rounded-full bg-background/90 backdrop-blur-sm"
            >
              Back
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default KycAdult;
