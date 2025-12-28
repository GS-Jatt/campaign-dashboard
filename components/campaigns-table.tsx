import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CampaignStatusBadge } from "./campaign-status-badge";
import { formatCurrency, type Campaign } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface CampaignsTableProps {
  campaigns: Campaign[];
}

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Budget</TableHead>
            <TableHead className="text-right">Daily Budget</TableHead>
            <TableHead>Start Date</TableHead>
            {/*<TableHead>End Date</TableHead>*/}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No campaigns found
              </TableCell>
            </TableRow>
          ) : (
            campaigns.map((campaign) => {
              return (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <CampaignStatusBadge status={campaign.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(campaign.budget)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(campaign.daily_budget)}
                  </TableCell>
                  <TableCell>
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </TableCell>
                  {/*<TableCell>{new Date(campaign.endDate).toLocaleDateString()}</TableCell>*/}
                  <TableCell className="text-right">
                    <Link href={`/campaigns/${campaign.id}`}>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
