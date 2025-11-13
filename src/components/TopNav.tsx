import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import userData from "../mock/user.json";

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";

  return (
    <nav className="sticky top-0 z-40 gradient-primary border-b border-primary/20 shadow-md">
      <div className="flex items-center justify-between px-4 h-14 max-w-lg mx-auto">
        {/* Finzo Logo */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className={cn(
            "flex items-center gap-2 px-0 hover:bg-primary-foreground/10",
            "transition-all hover:scale-105 text-primary-foreground"
          )}
        >
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-primary-foreground/20">
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground tracking-tight">
            Finzo
          </span>
        </Button>

        {/* Profile Avatar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          className={cn(
            "rounded-full transition-all hover:scale-110 hover:bg-primary-foreground/10",
            isProfilePage && "ring-2 ring-primary-foreground/50 ring-offset-2 ring-offset-transparent"
          )}
        >
          <Avatar className="w-10 h-10 border-2 border-primary-foreground/30 shadow-md">
            <AvatarImage src={userData.profilePicture} alt={userData.name} />
            <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground font-semibold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </nav>
  );
};

export default TopNav;

