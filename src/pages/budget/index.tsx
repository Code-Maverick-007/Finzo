import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingDown, TrendingUp, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import expensesData from "../../mock/expenses.json";

const Budget = () => {
  const navigate = useNavigate();

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">
          Budget Tracker
        </h1>
        <p className="text-primary-foreground/80">
          Manage your spending wisely
        </p>
      </div>

      <div className="px-6 space-y-6">
        
        {/* Budget Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                This Month's Budget
              </p>
              <h2 className="text-3xl font-bold">
                {formatINR(expensesData.monthlyBudget)}
              </h2>
            </div>

            <Button
              onClick={() => navigate("/budget/add")}
              size="sm"
              className="rounded-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Expense
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Spent */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Spent</span>
              </div>
              <p className="text-xl font-semibold text-destructive">
                {formatINR(expensesData.spent)}
              </p>
            </div>

            {/* Remaining */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Remaining</span>
              </div>
              <p className="text-xl font-semibold text-success">
                {formatINR(expensesData.remaining)}
              </p>
            </div>

          </div>

          <Progress
            value={(expensesData.spent / expensesData.monthlyBudget) * 100}
            className="h-3 mb-2"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {((expensesData.spent / expensesData.monthlyBudget) * 100).toFixed(1)}%
              used
            </span>
            <Button
              onClick={() => navigate("/budget/analytics")}
              variant="ghost"
              size="sm"
              className="h-auto p-0"
            >
              View Analytics
            </Button>
          </div>
        </Card>

        {/* Category Breakdown */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>

          <div className="space-y-3">
            {expensesData.categories.map((category) => (
              <Card key={category.name} className="p-4">
                
                <div className="flex items-center justify-between mb-3">
                  
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>

                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatINR(category.spent)} of{" "}
                        {formatINR(category.budget)}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    <p className="font-semibold">
                      {((category.spent / category.budget) * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatINR(category.budget - category.spent)} left
                    </p>
                  </div>
                </div>

                <Progress
                  value={(category.spent / category.budget) * 100}
                  className="h-2"
                />

              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>

          <div className="space-y-3">
            {expensesData.recentExpenses.map((expense) => (
              <Card key={expense.id} className="p-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-destructive">
                      -{formatINR(expense.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>

              </Card>
            ))}
          </div>
        </div>

        {/* Analytics CTA */}
        <Card
          onClick={() => navigate("/budget/analytics")}
          className="p-6 cursor-pointer hover:border-primary transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Detailed Analytics</h3>
              <p className="text-sm text-muted-foreground">
                View charts, trends, and spending insights
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Budget;
