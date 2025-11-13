import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, User, ArrowLeft, Sparkles } from "lucide-react";

const AccountType = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary-foreground/80" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
              Choose Account Type
            </h1>
            <Sparkles className="w-5 h-5 text-primary-foreground/80" />
          </div>
          <p className="text-primary-foreground/80 text-base">
            Select the option that best describes you
          </p>
        </div>

        {/* Account Cards */}
        <div className="space-y-4">
          <Card
            onClick={() => navigate("/onboarding/kyc-teen")}
            className="p-6 cursor-pointer hover:border-primary-foreground/30 transition-all hover:shadow-xl hover:scale-[1.02] bg-background/95 backdrop-blur-sm border-2 border-primary-foreground/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <Users className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-primary">Teen Account (13-17)</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Requires parent/guardian approval. Learn to save and invest with guidance.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Parent oversight and controls
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Spending limits and approvals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Educational resources
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => navigate("/onboarding/kyc-adult")}
            className="p-6 cursor-pointer hover:border-primary-foreground/30 transition-all hover:shadow-xl hover:scale-[1.02] bg-background/95 backdrop-blur-sm border-2 border-primary-foreground/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                <User className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-accent">Adult Account (18+)</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full access to all features. Independent financial management.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Complete account control
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Advanced investment options
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Tax planning tools
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Button
            onClick={() => navigate("/")}
            variant="secondary"
            className="rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountType;
