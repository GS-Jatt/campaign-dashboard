"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CampaignsFiltersProps {
  searchQuery: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function CampaignsFilters({ searchQuery, statusFilter, onSearchChange, onStatusChange }: CampaignsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
