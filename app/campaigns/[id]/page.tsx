import {
  getCampaignById,
  getCampaignInsights,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard-header";
import { MetricCard } from "@/components/metric-card";
import { CampaignStatusBadge } from "@/components/campaign-status-badge";
import { CampaignInsightsChart } from "@/components/campaign-insights-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
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

async function CampaignDetailContent({ id }: { id: string }) {
  console.log(` CampaignDetailContent rendering for id: ${id}`);

  try {
    const [campaign, insights] = await Promise.all([
      getCampaignById(id),
      getCampaignInsights(id),
    ]);
    console.log(` Campaign details fetched:`, campaign, insights);

    const remaining = campaign.budget - insights.spend;
    const percentSpent = (insights.spend / campaign.budget) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-2">
                ← Back to Dashboard
              </Button>
            </Link>
            <h2 className="text-3xl font-bold">{campaign.name}</h2>
          </div>
          <CampaignStatusBadge status={campaign.status} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Campaign ID
                </dt>
                <dd className="mt-1 text-sm">{campaign.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-1 text-sm">{campaign.status}</dd>
              </div>
              {/*<div>
                <dt className="text-sm font-medium text-muted-foreground">Start Date</dt>
                <dd className="mt-1 text-sm">{new Date(campaign.startDate).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">End Date</dt>
                <dd className="mt-1 text-sm">{new Date(campaign.endDate).toLocaleDateString()}</dd>
              </div>*/}
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Daily Budget
                </dt>
                <dd className="mt-1 text-sm">
                  {formatCurrency(campaign.daily_budget)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Created At
                </dt>
                <dd className="mt-1 text-sm">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Budget"
              value={formatCurrency(campaign.budget)}
            />
            <MetricCard
              title="Amount Spent"
              value={formatCurrency(insights.spend)}
              subtitle={`${percentSpent.toFixed(1)}% of budget`}
            />
            <MetricCard
              title="Remaining"
              value={formatCurrency(remaining)}
              subtitle={
                remaining < 0
                  ? "Over budget"
                  : `${(100 - percentSpent).toFixed(1)}% left`
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Impressions"
              value={formatNumber(insights.impressions)}
            />
            <MetricCard title="Clicks" value={formatNumber(insights.clicks)} />
            <MetricCard
              title="Conversions"
              value={formatNumber(insights.conversions)}
            />
            <MetricCard
              title="Click-Through Rate"
              value={formatPercentage(insights.ctr)}
              subtitle="CTR"
            />
            <MetricCard
              title="Cost Per Click"
              value={formatCurrency(insights.cpc)}
              subtitle="CPC"
            />
            <MetricCard
              title="Conversion Rate"
              value={formatPercentage(insights.conversion_rate)}
              subtitle="CVR"
            />
          </div>
        </div>

        <CampaignInsightsChart insights={insights} />
      </div>
    );
  } catch (error) {
    console.error(` Error loading campaign details for ${id}:`, error);

    return (
      <div className="space-y-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            ← Back to Dashboard
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Campaign</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
            <div className="mt-2 text-sm">
              Please verify the campaign ID and try again.
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6">
        <Suspense fallback={<LoadingSkeleton />}>
          <CampaignDetailContent id={id} />
        </Suspense>
      </main>
    </div>
  );
}
