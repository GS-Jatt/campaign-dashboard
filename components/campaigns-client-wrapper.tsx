"use client"

import { useState, useMemo } from "react"
import { CampaignsTable } from "./campaigns-table"
import { CampaignsFilters } from "./campaigns-filters"
import type { Campaign } from "@/lib/api"

interface CampaignsClientWrapperProps {
  campaigns: Campaign[]
}

export function CampaignsClientWrapper({ campaigns }: CampaignsClientWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
  }, [campaigns, searchQuery, statusFilter])

  return (
    <>
      <CampaignsFilters
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
      />
      <CampaignsTable campaigns={filteredCampaigns} />
    </>
  )
}
