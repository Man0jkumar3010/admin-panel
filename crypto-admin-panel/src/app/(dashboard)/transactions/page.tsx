'use client'

import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-2">View all platform transactions</p>
      </div>

      <Card className="p-12">
        <div className="text-center">
          <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Transactions Module
          </h3>
          <p className="text-gray-600">
            This page will display all transactions across the platform.
          </p>
        </div>
      </Card>
    </div>
  )
}