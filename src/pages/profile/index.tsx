import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import userData from "../../mock/user.json";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: CreditCard,
      label: "Subscription",
      description: "Manage your premium plan",
      path: "/profile/subscription",
      badge: userData.subscription.tier,
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences and privacy",
      path: "/profile/settings",
    },
    {
      icon: Shield,
      label: "Security",
      description: "Password and 2FA",
      path: "/profile/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-4 border-primary-foreground/20">
            <AvatarImage src={userData.profilePicture} alt={userData.name} />
            <AvatarFallback>{userData.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-primary-foreground">{userData.name}</h1>
              {userData.subscription.tier === "premium" && (
                <Crown className="w-5 h-5 text-warning" />
              )}
            </div>
            <p className="text-primary-foreground/80 text-sm mb-2">{userData.email}</p>
            <Badge variant="secondary" className="capitalize">
              {userData.accountType} Account
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-background/95">
            <p className="text-xs text-muted-foreground mb-1">Member Since</p>
            <p className="font-semibold">
              {new Date(userData.joinedDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </Card>
          <Card className="p-4 bg-background/95">
            <p className="text-xs text-muted-foreground mb-1">KYC Status</p>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-success" />
              <p className="font-semibold capitalize">{userData.kycStatus}</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Account Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Account Information</h2>
          <Card className="divide-y">
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>
            {userData.parentLinked && (
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Parent/Guardian</p>
                  <p className="font-medium">{userData.parentName}</p>
                  <p className="text-xs text-muted-foreground">{userData.parentEmail}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Settings & Preferences</h2>
          <Card className="divide-y">
            {menuItems.map((item) => (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.label}</p>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full rounded-full text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
