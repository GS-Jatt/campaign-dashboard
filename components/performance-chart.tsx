"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Campaign } from "@/lib/api"

interface PerformanceChartProps {
  campaigns: Campaign[]
}

export function PerformanceChart({ campaigns }: PerformanceChartProps) {
  const chartData = campaigns.slice(0, 10).map((campaign) => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + "..." : campaign.name,
    budget: campaign.budget,
    daily: campaign.daily_budget,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview (Top 10 Campaigns)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            budget: {
              label: "Total Budget",
              color: "hsl(var(--chart-1))",
            },
            daily: {
              label: "Daily Budget",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="budget" fill="var(--color-budget)" name="Total Budget" />
              <Bar dataKey="daily" fill="var(--color-daily)" name="Daily Budget" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
