import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gradient-primary text-primary-foreground overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-primary-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-foreground/3 rounded-full blur-3xl"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 relative z-10">
        {/* Top Branding */}
        <div className="w-full max-w-md text-center space-y-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-4">
            <div className="relative">
              {/* Main Logo Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-primary-foreground/25 backdrop-blur-md flex items-center justify-center border-2 border-primary-foreground/40 shadow-2xl shadow-primary-foreground/20">
                <Wallet className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground/90 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-1">
                <Sparkles className="w-5 h-5 text-primary-foreground/70 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-primary-foreground/10 blur-xl -z-10"></div>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold drop-shadow-2xl tracking-tight leading-none">
              Finzo
            </h1>
            <div className="h-1 w-20 bg-primary-foreground/30 rounded-full mx-auto"></div>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold opacity-95 tracking-wide">
              Save Early. Grow Big.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg opacity-85 max-w-sm mx-auto leading-relaxed pt-2">
            Your all-in-one financial companion for smart money management
          </p>
        </div>


        {/* CTA Button */}
        <div className="w-full max-w-md mt-8 pb-8 space-y-4">
          <Button
            onClick={() => navigate("/onboarding/type")}
            size="lg"
            className="w-full rounded-full shadow-glow text-lg font-semibold h-14 hover:scale-105 transition-transform duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Secondary action */}
          <p className="text-center text-sm opacity-80">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/onboarding/otp")}
              className="underline font-medium hover:opacity-100 transition-opacity"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
