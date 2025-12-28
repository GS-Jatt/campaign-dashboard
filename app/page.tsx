import { getAggregateInsights, getCampaigns } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard-header";
import { OverviewMetrics } from "@/components/overview-metrics";
import { CampaignsClientWrapper } from "@/components/campaigns-client-wrapper";
import { PerformanceChart } from "@/components/performance-chart";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function DashboardContent() {
  console.log("  DashboardContent rendering, starting data fetch...");

  try {
    const [insights, campaigns] = await Promise.all([
      getAggregateInsights(),
      getCampaigns(),
    ]);

    console.log(
      "  Data fetched successfully. Insights:",
      insights,
      "Campaigns:",
      campaigns,
    );

    return (
      <div className="space-y-6">
        <OverviewMetrics insights={insights} />

        <PerformanceChart campaigns={campaigns} />

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <CampaignsClientWrapper campaigns={campaigns} />
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("  Error in DashboardContent:", error);

    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Dashboard</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
          <div className="mt-2 text-sm">
            Check the browser console for more details.
          </div>
        </AlertDescription>
      </Alert>
    );
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}
