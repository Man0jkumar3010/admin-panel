'use client'

import { User, KYCStatus } from '@/types/user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatDateShort } from '@/lib/formatters'
import { useState, useEffect } from 'react'
import { useUserStore } from '@/store/user-store'
import { toast } from 'sonner'
import { KYC_STATUSES } from '@/lib/constants'

interface UserDetailCardProps {
  user: User
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  const [kycStatus, setKycStatus] = useState<string>(user.kyc_status)
  const { updateKYCStatus, loading } = useUserStore()

  useEffect(() => {
    setKycStatus(user.kyc_status)
  }, [user.kyc_status])

  const handleKYCUpdate = async () => {
    try {

      await updateKYCStatus(user.id, kycStatus as KYCStatus)
      
      toast.success('Success', {
        description: `KYC status updated to ${kycStatus}`,
      })
    } catch (error) {
      
      toast.error('Error', {
        description: 'Failed to update KYC status',
      })
    }
  }

  const kycOptions = KYC_STATUSES.filter((status) => status !== 'All')
  const isStatusChanged = kycStatus !== user.kyc_status

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Name:</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Country:</span>
            <span className="font-medium">{user.country}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Joined Date:</span>
            <span className="font-medium">{formatDateShort(user.joined_date)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-muted-foreground">KYC Status:</span>
            <div className="flex items-center gap-2">
              <Select 
                value={kycStatus} 
                onValueChange={(value: string) => setKycStatus(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {kycOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={handleKYCUpdate}
                disabled={loading || !isStatusChanged}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}