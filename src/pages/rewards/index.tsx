import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Gift,
  Trophy,
  Zap,
  Star,
  ChevronRight,
  Sparkles,
  CreditCard,
  Ticket,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import rewardsData from "../../mock/rewards.json";

const Rewards = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <h1 className="text-2xl font-bold text-primary-foreground">Rewards</h1>
        <p className="text-primary-foreground/80">
          Earn rewards for smart financial habits
        </p>
      </div>

      <div className="px-6 space-y-8">
        {/* ⭐ Points Overview */}
        <Card className="p-6 gradient-card shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Your Points</p>
              <h2 className="text-4xl font-bold">{rewardsData.points}</h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Star className="w-8 h-8 text-accent" />
            </div>
          </div>

          <Progress
            value={
              (rewardsData.points /
                (rewardsData.points + rewardsData.pointsToNextLevel)) *
              100
            }
            className="h-2"
          />
          <div className="flex justify-between text-sm mt-2 text-muted-foreground">
            <span>Current: {rewardsData.level}</span>
            <span>Next: {rewardsData.nextLevel}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {rewardsData.pointsToNextLevel} points left
          </p>
        </Card>

        {/* ⚡ Daily Streak */}
        <Card className="p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Daily Streak</p>
                <p className="text-sm text-muted-foreground">
                  {rewardsData.dailyStreak} days
                </p>
              </div>
            </div>
            <Badge variant="secondary">+50/day</Badge>
          </div>
        </Card>

        {/* 🎰 Scratch Cards */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Scratch Cards
          </h2>

          <Card
            onClick={() => navigate("/rewards/scratch")}
            className="p-5 gradient-card cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">1 Scratch Card Available</h3>
                <p className="text-sm text-muted-foreground">
                  Win cashback, coins & perks
                </p>
              </div>
              <Gift className="w-7 h-7 text-accent" />
            </div>
          </Card>
        </div>

        {/* 🎯 Redeemable Rewards */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Redeem Rewards</h2>
          <div className="space-y-3">
            {rewardsData.availableRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`p-4 ${
                  reward.available
                    ? "cursor-pointer hover:border-primary"
                    : "opacity-50"
                } transition-all`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">{reward.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reward.points} points
                      </p>
                    </div>
                  </div>

                  {reward.available ? (
                    <Button size="sm" className="rounded-full">
                      Redeem
                    </Button>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 🏆 Milestones */}
        <Card
          onClick={() => navigate("/rewards/milestone")}
          className="p-6 cursor-pointer hover:border-primary transition-all shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Milestones</h3>
                <p className="text-sm text-muted-foreground">
                  {rewardsData.milestones.filter((m) => m.achieved).length} of{" "}
                  {rewardsData.milestones.length} achieved
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>

        {/* 🎟 Coupon Codes */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            Coupon Codes
          </h2>

          <div className="space-y-2">
            {rewardsData.couponCodes.map((code) => (
              <Card key={code.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{code.code}</p>
                  <p className="text-sm text-muted-foreground">{code.description}</p>
                </div>
                <Badge variant="secondary">{code.discount}% OFF</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* 👥 Referral Bonus */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-success" />
            Referral Rewards
          </h2>

          <Card className="p-5 shadow-sm">
            <p className="font-semibold">Invite Friends — Earn Points!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Earn {rewardsData.referralPoints} points for every successful referral.
            </p>
            <Button className="w-full rounded-full mt-4">Invite Now</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
