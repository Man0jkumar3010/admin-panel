'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/user-store'
import { toast } from 'sonner'
import { KYC_STATUSES } from '@/lib/constants'

interface UserFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  kycFilter: string
  setKycFilter: (filter: string) => void
}

export function UserFilters({
  searchQuery,
  setSearchQuery,
  kycFilter,
  setKycFilter,
}: UserFiltersProps) {
  const { selectedUsers, suspendMultipleUsers, loading, clearSelection } = useUserStore()

  const handleSuspend = async () => {
    if (selectedUsers.size === 0) {
      toast.error('No Users Selected', {
        description: 'Please select at least one user to suspend',
      })
      return
    }

    try {
      const userIds = Array.from(selectedUsers)
      await suspendMultipleUsers(userIds)
      
      toast.success('Users Suspended', {
        description: `Successfully suspended ${userIds.length} user${userIds.length > 1 ? 's' : ''}`,
      })
      
      clearSelection()
    } catch (error) {
      toast.error('Suspension Failed', {
        description: 'Failed to suspend selected users',
      })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={kycFilter} onValueChange={setKycFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by KYC" />
          </SelectTrigger>
          <SelectContent>
            {KYC_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedUsers.size > 0 && (
        <Button
          variant="destructive"
          onClick={handleSuspend}
          disabled={loading}
        >
          {loading ? 'Suspending...' : `Suspend (${selectedUsers.size})`}
        </Button>
      )}
    </div>
  )
}