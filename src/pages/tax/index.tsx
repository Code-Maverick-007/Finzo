import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import taxData from "@/mock/tax.json";

const Tax = () => {
  const { currentYear, futureProjection, learningModules } = taxData;

  return (
    <div className="space-y-6">
  <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 p-6">
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Tax Center
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Track your tax situation, explore deductions, and optimize your tax strategy for maximum savings.
      </p>
    </div>
  </div>

  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {currentYear.year} Taxable Income
            </CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <Calculator className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentYear.taxableIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${currentYear.income.toLocaleString()} income - ${currentYear.deductions.toLocaleString()} deductions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Tax</CardTitle>
            <div className="rounded-lg bg-primary/10 p-2">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentYear.estimatedTax.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {currentYear.taxSaved > 0 ? (
                <span className="text-green-500">${currentYear.taxSaved} saved with deductions</span>
              ) : (
                "No estimated tax"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Future Projection</CardTitle>
            <CardDescription className="text-muted-foreground">
              Estimated tax situation in {futureProjection.year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Income</span>
                  <span className="font-medium">${futureProjection.estimatedIncome.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Tax Bracket</span>
                  <Badge variant="outline">{futureProjection.bracket}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm font-bold mt-2 pt-2 border-t">
                  <span>Estimated Tax</span>
                  <span>${futureProjection.estimatedTax.toLocaleString()}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full hover:bg-primary/10">
                <TrendingUp className="mr-2 h-4 w-4" />
                Explore Tax Strategies
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Learning Modules</CardTitle>
            <CardDescription className="text-muted-foreground">Expand your tax knowledge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningModules.slice(0, 3).map((module) => (
              <div key={module.id} className="flex items-center space-x-4">
                <div className={`rounded-lg p-2 ${module.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-primary/10'}`}>
                  {module.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{module.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {module.duration} • {module.points} points
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="link" className="w-full text-primary">
              View all modules
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tax;