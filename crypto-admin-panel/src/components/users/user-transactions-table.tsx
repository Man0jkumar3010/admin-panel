'use client'

import { Transaction } from '@/types/user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/formatters'

interface UserTransactionsTableProps {
  transactions: Transaction[]
}

export function UserTransactionsTable({
  transactions,
}: UserTransactionsTableProps) {
  const getTypeBadgeVariant = (type: string) => {
    return type === 'Deposit' ? 'default' : 'secondary'
  }

  const getStatusBadgeVariant = (status: string) => {
    const variants = {
      Completed: 'default',
      Pending: 'secondary',
      Failed: 'destructive',
    } as const
    return variants[status as keyof typeof variants] || 'default'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions available
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-sm">
                    {formatDate(tx.date)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(tx.type)}>
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.asset}</TableCell>
                  <TableCell className="font-medium">{tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(tx.status)}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}