import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

// Onboarding
import Welcome from "./pages/onboarding/Welcome";
import AccountType from "./pages/onboarding/AccountType";
import OtpLogin from "./pages/onboarding/OtpLogin";
import KycTeen from "./pages/onboarding/KycTeen";
import KycAdult from "./pages/onboarding/KycAdult";
import Tax from "./pages/tax";
// Dashboard
import Home from "./pages/dashboard/Home";

// Invest
import Invest from "./pages/invest/index";
import StockPurchase from "./pages/invest/StockPurchase";
import PaymentSuccess from "./pages/invest/PaymentSuccess";
import InvestmentCalculator from "./pages/invest/Calculator";

// Budget
import Budget from "./pages/budget/index";

// Rewards
import Rewards from "./pages/rewards/index";

// Profile
import Profile from "./pages/profile/index";
import Subscription from "./pages/profile/Subscription";

import NotFound from "./pages/NotFound";
import AIBot from "./components/AIBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Onboarding Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding/type" element={<AccountType />} />
          <Route path="/onboarding/otp" element={<OtpLogin />} />
          <Route path="/onboarding/kyc-teen" element={<KycTeen />} />
          <Route path="/onboarding/kyc-adult" element={<KycAdult />} />


          {/* Dashboard Routes with Bottom Nav */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/invest/calculator" element={<InvestmentCalculator />} />
            <Route path="/invest/stock-purchase" element={<StockPurchase />} />
            <Route path="/invest/payment/success" element={<PaymentSuccess />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/subscription" element={<Subscription />} />
            <Route path="/tax" element={<Tax />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
