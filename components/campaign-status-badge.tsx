import { Badge } from "@/components/ui/badge"

interface CampaignStatusBadgeProps {
  status: string
}

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const statusLower = status.toLowerCase()

  const variant =
    statusLower === "active"
      ? "default"
      : statusLower === "paused"
        ? "secondary"
        : statusLower === "completed"
          ? "outline"
          : "destructive"

  return <Badge variant={variant}>{status}</Badge>
}
