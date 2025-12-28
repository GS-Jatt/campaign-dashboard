export interface Campaign {
  id: string
  name: string
  status: "active" | "paused" | "completed" | "draft"
  budget: number
  spent: number
  startDate: string
  endDate: string
  platform: "facebook" | "google" | "linkedin" | "twitter"
}

export interface CampaignInsights {
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
  revenue: number
  dailyMetrics?: {
    date: string
    spend: number
    clicks: number
    conversions: number
  }[]
}

export interface AggregateInsights extends CampaignInsights {
  totalCampaigns: number
  activeCampaigns: number
  totalBudget: number
  totalSpent: number
}
