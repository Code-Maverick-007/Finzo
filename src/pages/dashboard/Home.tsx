import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  Target,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import walletData from "../../mock/wallet.json";
import sipData from "../../mock/sipPlans.json";
import expensesData from "../../mock/expenses.json";
import rewardsData from "../../mock/rewards.json";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary p-6 rounded-b-3xl">
        <div className="mb-6">
          <p className="text-primary-foreground/80 text-sm">Total Balance</p>
          <h1 className="text-3xl font-bold text-primary-foreground">
            ${walletData.balance.toLocaleString()}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-background/95">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <p className="text-lg font-semibold">${walletData.monthlyIncome}</p>
          </Card>
          <Card className="p-4 bg-background/95">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-4 h-4 text-destructive" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
            <p className="text-lg font-semibold">${walletData.monthlyExpenses}</p>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={() => navigate("/invest")}
            variant="outline"
            className="flex-col h-auto py-4 px-2 rounded-2xl"
          >
            <TrendingUp className="w-5 h-5 mb-1 text-primary" />
            <span className="text-xs">Invest</span>
          </Button>
          <Button
            onClick={() => navigate("/budget")}
            variant="outline"
            className="flex-col h-auto py-4 px-2 rounded-2xl"
          >
            <Wallet className="w-5 h-5 mb-1 text-success" />
            <span className="text-xs">Budget</span>
          </Button>
          <Button
            onClick={() => navigate("/rewards")}
            variant="outline"
            className="flex-col h-auto py-4 px-2 rounded-2xl"
          >
            <Gift className="w-5 h-5 mb-1 text-warning" />
            <span className="text-xs">Rewards</span>
          </Button>
          <Button
            onClick={() => navigate("/tax")}
            variant="outline"
            className="flex-col h-auto py-4 px-2 rounded-2xl"
          >
            <Target className="w-5 h-5 mb-1 text-accent" />
            <span className="text-xs">Tax</span>
          </Button>
        </div>

        {/* Active SIPs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Investments</h2>
            <Button onClick={() => navigate("/invest")} variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {sipData.activePlans.map((plan) => (
              <Card key={plan.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <PiggyBank className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${plan.amount}/{plan.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">+{plan.returns}%</p>
                    <p className="text-sm text-muted-foreground">
                      ${plan.currentValue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress
                  value={(plan.currentValue / plan.targetAmount) * 100}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {((plan.currentValue / plan.targetAmount) * 100).toFixed(1)}% of $
                  {plan.targetAmount.toLocaleString()} goal
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Budget Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Budget This Month</h2>
            <Button onClick={() => navigate("/budget")} variant="ghost" size="sm">
              Details
            </Button>
          </div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold">${expensesData.spent}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-success">${expensesData.remaining}</p>
              </div>
            </div>
            <Progress
              value={(expensesData.spent / expensesData.monthlyBudget) * 100}
              className="h-2 mb-2"
            />
            <p className="text-xs text-muted-foreground">
              {((expensesData.spent / expensesData.monthlyBudget) * 100).toFixed(1)}% of $
              {expensesData.monthlyBudget} budget used
            </p>
          </Card>
        </div>

        {/* Rewards */}
        <Card className="p-4 gradient-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm mb-1">Reward Points</p>
              <p className="text-3xl font-bold text-primary-foreground">{rewardsData.points}</p>
              <p className="text-primary-foreground/80 text-sm mt-1">
                {rewardsData.pointsToNextLevel} points to {rewardsData.nextLevel}
              </p>
            </div>
            <Button
              onClick={() => navigate("/rewards")}
              variant="secondary"
              className="rounded-full"
            >
              Redeem
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
