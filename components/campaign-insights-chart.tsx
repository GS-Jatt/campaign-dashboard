"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { CampaignInsights } from "@/lib/api"

interface CampaignInsightsChartProps {
  insights: CampaignInsights
}

export function CampaignInsightsChart({ insights }: CampaignInsightsChartProps) {
  const chartData = [
    {
      metric: "Impressions",
      value: insights.impressions,
      normalized: (insights.impressions / 1000).toFixed(0),
    },
    {
      metric: "Clicks",
      value: insights.clicks,
      normalized: insights.clicks,
    },
    {
      metric: "Conversions",
      value: insights.conversions,
      normalized: insights.conversions * 10,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Count",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="var(--color-value)" name="Actual Count" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
