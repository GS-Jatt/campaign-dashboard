const API_BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  daily_budget: number;
  created_at: string;
  spent?: number;
  [key: string]: any;
}

export interface CampaignInsights {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  [key: string]: any;
}

export interface AggregateInsights {
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
  [key: string]: any;
}

export async function getCampaigns(): Promise<Campaign[]> {
  console.log(" Fetching campaigns from:", `${API_BASE_URL}/campaigns`);

  try {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(" Campaigns response status:", response.status);
    console.log(" Campaigns response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        " Failed to fetch campaigns. Status:",
        response.status,
        "Response:",
        errorText,
      );
      throw new Error(
        `Failed to fetch campaigns: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const campaigns = data.campaigns || [];
    console.log(" Campaigns data normalized:", campaigns);
    return campaigns;
  } catch (error) {
    console.error(" Error fetching campaigns:", error);
    throw error;
  }
}

export async function getCampaignById(id: string): Promise<Campaign> {
  console.log(" Fetching campaign by id:", id);

  try {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(" Campaign response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        " Failed to fetch campaign. Status:",
        response.status,
        "Response:",
        errorText,
      );
      throw new Error(
        `Failed to fetch campaign: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const campaign = data.campaign || data;
    console.log(" Campaign data normalized:", campaign);
    return campaign;
  } catch (error) {
    console.error(" Error fetching campaign:", error);
    throw error;
  }
}

export async function getAggregateInsights(): Promise<AggregateInsights> {
  console.log(
    " Fetching aggregate insights from:",
    `${API_BASE_URL}/campaigns/insights`,
  );

  try {
    const response = await fetch(`${API_BASE_URL}/campaigns/insights`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(" Insights response status:", response.status);
    console.log(" Insights response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        " Failed to fetch insights. Status:",
        response.status,
        "Response:",
        errorText,
      );
      throw new Error(
        `Failed to fetch aggregate insights: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const insights = data.insights || data;
    console.log(" Insights data normalized:", insights);
    return insights;
  } catch (error) {
    console.error(" Error fetching aggregate insights:", error);
    throw error;
  }
}

export async function getCampaignInsights(
  id: string,
): Promise<CampaignInsights> {
  console.log(" Fetching campaign insights for id:", id);

  try {
    const response = await fetch(`${API_BASE_URL}/campaigns/${id}/insights`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    console.log(" Campaign insights response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        " Failed to fetch campaign insights. Status:",
        response.status,
        "Response:",
        errorText,
      );
      throw new Error(
        `Failed to fetch campaign insights: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    const insights = data.insights || data;
    console.log(" Campaign insights normalized:", insights);
    return insights;
  } catch (error) {
    console.error(" Error fetching campaign insights:", error);
    throw error;
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
