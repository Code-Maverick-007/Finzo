import { Home, TrendingUp, Wallet, Gift, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: TrendingUp, label: "Invest", path: "/invest" },
    { icon: Wallet, label: "Budget", path: "/budget" },
    { icon: Gift, label: "Rewards", path: "/rewards" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
