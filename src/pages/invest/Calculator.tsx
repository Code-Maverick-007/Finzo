import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Info, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AssetRates {
  Crypto: number;
  Stocks: number;
  RealEstate: number;
  MutualFunds: number;
}

const InvestmentCalculator = () => {
  const navigate = useNavigate();
  
  // Default annual rates (editable by user)
  const defaultRates: AssetRates = {
    Crypto: 0.4, // 40% - very volatile
    Stocks: 0.1, // 10% - long-term market average
    RealEstate: 0.06, // 6% - residential real estate
    MutualFunds: 0.12, // 12% - SIP-like equity returns
  };

  const [rates, setRates] = useState<AssetRates>(defaultRates);
  const [amount, setAmount] = useState<number>(100);
  const [freq, setFreq] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [asset, setAsset] = useState<keyof AssetRates>("Stocks");
  const [futureValue, setFutureValue] = useState<number>(0);
  const [lumpSum, setLumpSum] = useState<number>(0);

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, freq, tenureYears, asset, rates, lumpSum]);

  function periodsPerYear(f: "daily" | "monthly" | "yearly"): number {
    if (f === "daily") return 365;
    if (f === "monthly") return 12;
    return 1;
  }

  // Periodic contribution future value formula (contributions at period end)
  function calcFutureValue(
    P: number,
    annualRate: number,
    years: number,
    f: "daily" | "monthly" | "yearly"
  ): number {
    const m = periodsPerYear(f);
    const r = annualRate / m;
    const n = years * m;
    const p = Number(P) || 0;

    if (r === 0) return p * n;

    const fv = (p * (Math.pow(1 + r, n) - 1)) / r;
    return fv;
  }

  function calculate() {
    const annualRate = rates[asset] ?? 0;
    const fvContrib = calcFutureValue(Number(amount), annualRate, Number(tenureYears), freq);
    const fvLump = lumpSum ? Number(lumpSum) * Math.pow(1 + annualRate, tenureYears) : 0;
    setFutureValue(fvContrib + fvLump);
  }

  function handleRateChange(key: keyof AssetRates, value: number[]) {
    const v = value[0];
    setRates((prev) => ({ ...prev, [key]: isNaN(v) ? 0 : v }));
  }

  // Format currency
  function fmt(x: number): string {
    const n = Number(x) || 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function handleSaveSnapshot() {
    const snapshot = {
      asset,
      amount,
      frequency: freq,
      tenure: tenureYears,
      estimate: futureValue,
      rate: rates[asset],
    };

    // In a real app, you'd save this to backend/localStorage
    toast.success("Snapshot saved!", {
      description: `Asset: ${asset}, Amount: ₹${amount}/${freq}, Tenure: ${tenureYears} years, Estimate: ${fmt(futureValue)}`,
    });
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-primary p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-6 h-6 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Investment Calculator</h1>
            </div>
            <p className="text-primary-foreground/80">
              Compare investment options & calculate future gains
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Asset Rates Configuration */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Where to invest — Annual return rates</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Adjust these rates to model different scenarios. These are examples, not financial advice.
          </p>

          <div className="space-y-4">
            {Object.entries(rates).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold">{key}</Label>
                    <p className="text-xs text-muted-foreground">Long-term example rate</p>
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">
                    {(value * 100).toFixed(2)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[value]}
                    onValueChange={(val) => handleRateChange(key as keyof AssetRates, val)}
                    min={-0.5}
                    max={1}
                    step={0.01}
                    className="flex-1"
                  />
                  <div className="w-20 text-right text-sm text-muted-foreground">
                    {(value * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <details className="mt-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer flex items-center gap-2">
              <Info className="w-4 h-4" />
              Why these numbers?
            </summary>
            <ul className="mt-2 pl-6 list-disc space-y-1">
              <li>Crypto: highly volatile — can produce outsized gains or severe losses.</li>
              <li>Stocks: broad-market historical averages (varies by country & period).</li>
              <li>Real estate: local market dependent; residential price change examples.</li>
              <li>Mutual funds / SIPs: equity SIPs often show double-digit XIRR over long periods.</li>
            </ul>
          </details>
        </Card>

        {/* Investment Calculator */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your Investment</h2>

          <div className="space-y-4">
            <div>
              <Label>Choose asset</Label>
              <Select value={asset} onValueChange={(val) => setAsset(val as keyof AssetRates)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(rates).map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Contribution amount (per period)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <Label>Frequency</Label>
              <Select value={freq} onValueChange={(val) => setFreq(val as "daily" | "monthly" | "yearly")}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tenure: {tenureYears} years</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[tenureYears]}
                  onValueChange={(val) => setTenureYears(val[0])}
                  min={1}
                  max={30}
                  step={1}
                  className="flex-1"
                />
                <div className="w-16 text-right font-semibold">{tenureYears}y</div>
              </div>
            </div>

            <div>
              <Label>One-time (lump-sum) investment (optional)</Label>
              <Input
                type="number"
                value={lumpSum}
                onChange={(e) => setLumpSum(Number(e.target.value))}
                className="mt-2"
                placeholder="Enter lump sum amount"
              />
            </div>

            <Card className="p-4 gradient-card mt-4">
              <div className="text-sm text-muted-foreground mb-1">Projected future value</div>
              <div className="text-3xl font-bold text-primary">{fmt(futureValue)}</div>
              <div className="text-xs text-muted-foreground mt-2">
                Based on {(rates[asset] * 100).toFixed(2)}% annual rate & {tenureYears} years.
              </div>
            </Card>

            <Button onClick={handleSaveSnapshot} className="w-full" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Snapshot
            </Button>
          </div>
        </Card>

        {/* Projections for Different Tenures */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Projections by Tenure</h2>
          <p className="text-sm text-muted-foreground mb-4">
            See how your investment grows over different time periods. Use the sliders above to
            model conservative vs aggressive scenarios.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[5, 6, 7, 8, 9, 10].map((y) => {
              const projectedValue =
                calcFutureValue(Number(amount), rates[asset], y, freq) +
                (lumpSum ? Number(lumpSum) * Math.pow(1 + rates[asset], y) : 0);
              return (
                <Card key={y} className="p-4 gradient-card">
                  <div className="text-sm text-muted-foreground mb-1">After {y} years</div>
                  <div className="text-xl font-bold text-primary">{fmt(projectedValue)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Rate: {(rates[asset] * 100).toFixed(2)}%
                  </div>
                </Card>
              );
            })}
          </div>

          <p className="mt-4 text-muted-foreground text-sm">
            💡 Tip: Try combinations — small daily amounts compound surprisingly well over long
            tenures.
          </p>
        </Card>

        {/* Disclaimer */}
        <Card className="p-4 bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ Not financial advice. This tool is an educational demo; results are illustrative
            only. Past performance does not guarantee future returns.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentCalculator;

