import { MetricCard } from "./metric-card"
import { formatCurrency, formatNumber, formatPercentage, type AggregateInsights } from "@/lib/api"

interface OverviewMetricsProps {
  insights: AggregateInsights
}

export function OverviewMetrics({ insights }: OverviewMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Total Campaigns" value={insights.total_campaigns} />
      <MetricCard title="Active Campaigns" value={insights.active_campaigns} />
      <MetricCard title="Total Spent" value={formatCurrency(insights.total_spend)} />
      <MetricCard title="Total Impressions" value={formatNumber(insights.total_impressions)} />
      <MetricCard
        title="Total Clicks"
        value={formatNumber(insights.total_clicks)}
        subtitle={`${formatPercentage(insights.avg_ctr)} avg CTR`}
      />
      <MetricCard
        title="Total Conversions"
        value={formatNumber(insights.total_conversions)}
        subtitle={`${formatPercentage(insights.avg_conversion_rate)} avg rate`}
      />
      <MetricCard title="Avg Cost Per Click" value={formatCurrency(insights.avg_cpc)} />
      <MetricCard title="Avg Conversion Rate" value={formatPercentage(insights.avg_conversion_rate)} />
    </div>
  )
}
