'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserDetailCard } from '@/components/users/user-detail-card'
import { UserBalanceCard } from '@/components/users/user-balanced-card'
import { UserTransactionsTable } from '@/components/users/user-transactions-table'
import { useUserDetails } from '@/hooks/use-user-details'

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = Number(params.id)

  const { user, balances, transactions } = useUserDetails(userId)

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">User not found</p>
        <Button
          variant="outline"
          onClick={() => router.push('/users')}
          className="mt-4"
        >
          Back to Users
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/users')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600 mt-1">{user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserDetailCard user={user} />
        <UserBalanceCard balances={balances} />
      </div>

      <UserTransactionsTable transactions={transactions} />
    </div>
  )
}