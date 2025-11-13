import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

// Mock AI responses based on current page
const getMockResponse = (path: string, userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Welcome page responses
  if (path === "/") {
    if (lowerMessage.includes("help") || lowerMessage.includes("what")) {
      return "Welcome to Finzo! I'm here to help you get started. Click 'Get Started' to begin your financial journey. You can choose between a Teen or Adult account.";
    }
    if (lowerMessage.includes("account") || lowerMessage.includes("type")) {
      return "We offer two account types: Teen (13-17) with parent supervision, and Adult (18+) with full access. Choose what fits you best!";
    }
    return "Hi! I'm Finzo AI, your financial assistant. I can help you navigate the platform, understand features, and answer questions. What would you like to know?";
  }
  
  // Account type page
  if (path === "/onboarding/type") {
    if (lowerMessage.includes("teen") || lowerMessage.includes("13")) {
      return "Teen accounts are perfect for learning! They include parent oversight, spending limits, and educational resources. Great for building financial habits early.";
    }
    if (lowerMessage.includes("adult") || lowerMessage.includes("18")) {
      return "Adult accounts give you full control! Access all investment options, tax tools, and advanced features. Perfect for independent financial management.";
    }
    return "Choose the account type that matches your age. Both options are secure and designed to help you grow your wealth!";
  }
  
  // KYC pages
  if (path.includes("kyc")) {
    if (lowerMessage.includes("document") || lowerMessage.includes("upload")) {
      if (path.includes("teen")) {
        return "For teen accounts, you'll need to upload your Aadhaar card (front and back). Make sure the images are clear and all details are visible.";
      }
      return "For adult accounts, you need both PAN card and a government ID (Aadhaar, Passport, or Driver's License). Upload clear, readable images.";
    }
    if (lowerMessage.includes("kyc") || lowerMessage.includes("verify")) {
      return "KYC (Know Your Customer) helps us verify your identity securely. This process is quick and keeps your account safe. All documents are encrypted.";
    }
    return "I can help with the KYC process! Make sure all required fields are filled and documents are uploaded clearly. Need help with anything specific?";
  }
  
  // Login page
  if (path.includes("otp")) {
    if (lowerMessage.includes("otp") || lowerMessage.includes("code")) {
      return "OTP (One-Time Password) is sent to your registered phone number. Enter the 6-digit code to securely log in. Didn't receive it? Try resending.";
    }
    return "Enter your phone number to receive an OTP. This secure method ensures only you can access your account.";
  }
  
  // Dashboard pages
  if (path === "/dashboard" || path === "/dashboard/") {
    if (lowerMessage.includes("balance") || lowerMessage.includes("money")) {
      return "Your total balance shows all your funds. You can see income, expenses, and track your financial health. Want to know how to increase it?";
    }
    if (lowerMessage.includes("sip") || lowerMessage.includes("investment")) {
      return "SIPs (Systematic Investment Plans) let you invest regularly. Check the Investments section to start a new SIP or track existing ones!";
    }
    return "Welcome to your dashboard! Here you can see your balance, active investments, budget status, and rewards. What would you like to explore?";
  }
  
  // Invest pages
  if (path.includes("/invest")) {
    if (lowerMessage.includes("stock") || lowerMessage.includes("buy")) {
      return "You can buy stocks directly through Finzo! Browse trending stocks, select quantity, and pay securely with FamPay. Start with small amounts to learn.";
    }
    if (lowerMessage.includes("calculator") || lowerMessage.includes("calculate")) {
      return "Our investment calculator helps you plan! Adjust rates, set amounts, and see future projections. Great for goal planning!";
    }
    if (lowerMessage.includes("sip") || lowerMessage.includes("plan")) {
      return "SIPs are perfect for regular investing! Choose a plan, set monthly amount, and watch your money grow. Start with as little as ₹25/month.";
    }
    return "Investments are key to wealth building! Explore SIPs, stocks, or use our calculator. I can help you choose the right option for your goals.";
  }
  
  // Budget pages
  if (path.includes("/budget")) {
    if (lowerMessage.includes("track") || lowerMessage.includes("expense")) {
      return "Track expenses by category - food, transport, entertainment. Set budgets and get alerts when you're close to limits. Smart tracking = better savings!";
    }
    if (lowerMessage.includes("save") || lowerMessage.includes("save money")) {
      return "Budgeting helps you save! Set monthly limits, track spending, and identify areas to cut back. Small changes add up to big savings!";
    }
    return "Budget tracking helps you control spending! Add expenses, set category limits, and see where your money goes. Want tips on saving more?";
  }
  
  // Rewards pages
  if (path.includes("/reward")) {
    if (lowerMessage.includes("point") || lowerMessage.includes("earn")) {
      return "Earn points for every transaction, investment, and smart financial move! Redeem points for cashback, vouchers, and exclusive benefits.";
    }
    if (lowerMessage.includes("redeem") || lowerMessage.includes("use")) {
      return "Redeem your reward points anytime! Browse available rewards and choose what you like. More points = better rewards!";
    }
    return "Rewards make saving fun! Earn points for good financial habits and redeem them for exciting benefits. Check your current points!";
  }
  
  // Subscription/Profile pages
  if (path.includes("/profile") || path.includes("subscription") || path.includes("plan")) {
    if (lowerMessage.includes("monthly") || lowerMessage.includes("49")) {
      return "Monthly Plan (₹49/month) - Auto-renew, no reinvestment, full ₹49 = revenue. Perfect for trying Finzo with no commitment!";
    }
    if (lowerMessage.includes("yearly") || lowerMessage.includes("499")) {
      return "Yearly Plan (₹499/year) - Best value! ₹51 automatically reinvested as micro-SIP. You earn SIP commission + float income. ₹448 = revenue.";
    }
    if (lowerMessage.includes("premium") || lowerMessage.includes("599") || lowerMessage.includes("advisory")) {
      return "Premium Advisory Plan (₹599/6 months) - ₹249 reinvested as mandatory SIP. Earn SIP commission + float interest. ₹350 = revenue per 6 months. Includes premium support!";
    }
    if (lowerMessage.includes("plan") || lowerMessage.includes("subscription") || lowerMessage.includes("pricing")) {
      return "We offer 3 plans: Monthly (₹49/mo), Yearly (₹499/yr with reinvestment), and Premium Advisory (₹599/6mo). Check the Subscription page to see all details!";
    }
    return "We have flexible subscription plans! Monthly, Yearly with reinvestment, and Premium Advisory. Each plan offers different benefits. Want to know more?";
  }
  
  // General responses
  if (lowerMessage.includes("invest") || lowerMessage.includes("investment")) {
    return "Investments help grow your money over time! You can start SIPs, buy stocks, or use our calculator to plan. Start small and grow gradually.";
  }
  
  if (lowerMessage.includes("budget") || lowerMessage.includes("spend")) {
    return "Budget tracking helps you manage expenses wisely. Set limits, track categories, and see where your money goes. Smart budgeting = more savings!";
  }
  
  if (lowerMessage.includes("reward") || lowerMessage.includes("point")) {
    return "Earn reward points for every smart financial move! Redeem them for exciting benefits. The more you save and invest, the more you earn!";
  }
  
  if (lowerMessage.includes("safe") || lowerMessage.includes("secure")) {
    return "Finzo uses bank-level security! All your data is encrypted and protected. We follow strict security protocols to keep your money and information safe.";
  }
  
  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return "Hello! 👋 I'm Finzo AI, your friendly financial assistant. I can help you navigate the platform, answer questions, and guide you. What can I help with?";
  }
  
  // Default response
  return "I'm here to help! You can ask me about account setup, investments, budgeting, rewards, or anything about Finzo. What would you like to know?";
};

const AIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; content: string }>>([
    {
      role: "bot",
      content: "👋 Hi! I'm Finzo AI, your financial assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset and add welcome message when opening chat or changing pages
    const welcomeMessages: Record<string, string> = {
      "/": "👋 Welcome to Finzo! Ready to start your financial journey? I'm here to help!",
      "/onboarding/type": "💡 Need help choosing an account type? I can explain the differences!",
      "/onboarding/kyc-teen": "📝 Let's complete your teen account setup together! Ask me anything.",
      "/onboarding/kyc-adult": "📋 I'll help you complete the KYC process step by step.",
      "/onboarding/otp": "🔐 Need help with login? I can guide you through it!",
      "/dashboard": "🏠 Welcome to your dashboard! I can help you understand your finances.",
      "/invest": "📈 Ready to invest? I can help you choose the right options!",
      "/budget": "💰 Let's manage your budget together! Ask me about tracking expenses.",
      "/rewards": "🎁 Check out your rewards! I can explain how to earn more points.",
      "/profile/subscription": "💳 Looking for the perfect plan? I can explain all our subscription options!",
    };

    const welcomeMsg = welcomeMessages[location.pathname];
    if (welcomeMsg) {
      setMessages([
        {
          role: "bot",
          content: welcomeMsg,
        },
      ]);
    }
  }, [location.pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = getMockResponse(location.pathname, userMessage);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <div className="fixed bottom-24 right-4 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={cn(
            "rounded-full w-14 h-14 shadow-2xl transition-all duration-300",
            "bg-gradient-to-br from-primary to-accent hover:scale-110",
            "animate-bounce hover:animate-none"
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary-foreground" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background animate-pulse"></div>
            </div>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-32 right-4 sm:right-6 w-80 sm:w-96 h-96 z-50 flex flex-col shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-md">
          {/* Header */}
          <div className="gradient-primary p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-primary-foreground animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-primary-foreground text-sm">Finzo AI</h3>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.role === "bot" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold">Finzo AI</span>
                    </div>
                  )}
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="rounded-full"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-primary hover:bg-primary/90"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIBot;

