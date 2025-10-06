'use client'

import { Balance } from '@/types/user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatters'

interface UserBalanceCardProps {
  balances: Balance[]
}

export function UserBalanceCard({ balances }: UserBalanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Balances</CardTitle>
      </CardHeader>
      <CardContent>
        {balances.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No balances available
          </div>
        ) : (
          <div className="space-y-3">
            {balances.map((balance) => (
              <div
                key={balance.asset}
                className="flex justify-between items-center p-3 bg-muted rounded-lg"
              >
                <div>
                  <div className="font-medium">{balance.asset}</div>
                  <div className="text-sm text-muted-foreground">
                    {balance.amount} {balance.asset}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatCurrency(balance.usd_value)}
                  </div>
                  <div className="text-sm text-muted-foreground">USD</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}