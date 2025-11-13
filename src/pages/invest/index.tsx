import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Plus, Target, ChevronRight, ArrowUpRight, ArrowDownRight, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sipData from "../../mock/sipPlans.json";
import stocksData from "../../mock/stocks.json";

const Invest = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">Investments</h1>
        <p className="text-primary-foreground/80">Grow your wealth with smart SIPs</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Portfolio Summary */}
        <Card className="p-6 gradient-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <h2 className="text-3xl font-bold">
                $
                {sipData.activePlans
                  .reduce((sum, plan) => sum + plan.currentValue, 0)
                  .toLocaleString()}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Avg. Returns</p>
              <p className="text-lg font-semibold text-success">
                +
                {(
                  sipData.activePlans.reduce((sum, plan) => sum + plan.returns, 0) /
                  sipData.activePlans.length
                ).toFixed(1)}
                %
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Monthly SIP</p>
              <p className="text-lg font-semibold">
                ${sipData.activePlans.reduce((sum, plan) => sum + plan.amount, 0)}
              </p>
            </div>
          </div>
        </Card>

        {/* Active SIPs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active SIPs</h2>
            <Button
              onClick={() => navigate("/invest/start")}
              size="sm"
              className="rounded-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Start New
            </Button>
          </div>

          <div className="space-y-3">
            {sipData.activePlans.map((plan) => (
              <Card
                key={plan.id}
                onClick={() => navigate(`/invest/sip/${plan.id}`)}
                className="p-4 cursor-pointer hover:border-primary transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <Badge
                        variant={plan.risk === "low" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {plan.risk} risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${plan.amount}/month • {plan.frequency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success text-lg">+{plan.returns}%</p>
                    <p className="text-sm text-muted-foreground">
                      ${plan.currentValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress to goal</span>
                    <span className="font-medium">
                      {((plan.currentValue / plan.targetAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={(plan.currentValue / plan.targetAmount) * 100}
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Target: ${plan.targetAmount.toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Explore New Plans</h2>
          <div className="space-y-3">
            {sipData.availablePlans.map((plan) => (
              <Card
                key={plan.id}
                onClick={() => navigate("/invest/start", { state: { plan } })}
                className="p-4 cursor-pointer hover:border-primary transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <Badge
                        variant={plan.risk === "low" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {plan.risk} risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground">
                        Min: ${plan.minAmount}/month
                      </span>
                      <span className="text-success font-medium">
                        Returns: ~{plan.expectedReturns}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Stocks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trending Stocks</h2>
            <Button
              onClick={() => navigate("/invest/stocks")}
              variant="ghost"
              size="sm"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {stocksData.trending.slice(0, 3).map((stock) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <Card
                  key={stock.symbol}
                  onClick={() => navigate("/invest/stock-purchase", { state: { stock, symbol: stock.symbol } })}
                  className="p-4 cursor-pointer hover:border-primary transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{stock.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{stock.symbol}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold">${stock.price.toFixed(2)}</span>
                        <div className={`flex items-center gap-1 ${isPositive ? "text-success" : "text-destructive"}`}>
                          {isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {isPositive ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {stock.marketCap}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/invest/stock-purchase", { state: { stock, symbol: stock.symbol } });
                        }}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Investment Calculator CTA */}
        <Card className="p-6 gradient-primary text-center">
          <Calculator className="w-12 h-12 mx-auto mb-3 text-primary-foreground" />
          <h3 className="text-lg font-semibold text-primary-foreground mb-2">
            Investment Calculator
          </h3>
          <p className="text-sm text-primary-foreground/80 mb-4">
            Calculate future returns and compare different investment options
          </p>
          <Button
            onClick={() => navigate("/invest/calculator")}
            variant="secondary"
            className="rounded-full"
          >
            Open Calculator
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Invest;
