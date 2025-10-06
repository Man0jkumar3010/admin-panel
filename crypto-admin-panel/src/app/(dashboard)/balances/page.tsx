'use client'

import { Card } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export default function BalancesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Balances</h1>
        <p className="text-gray-600 mt-2">Monitor platform balances and assets</p>
      </div>

      <Card className="p-12">
        <div className="text-center">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Balances Module
          </h3>
          <p className="text-gray-600">
            This page will display balance analytics and summaries.
          </p>
        </div>
      </Card>
    </div>
  )
}