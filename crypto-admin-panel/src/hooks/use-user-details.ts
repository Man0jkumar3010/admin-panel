'use client'

import { useMemo } from 'react'
import { useUserStore } from '@/store/user-store'
import balancesData from '@/mocks/data/balances.json'
import transactionsData from '@/mocks/data/transaction.json'
import { Balance, Transaction } from '@/types/user'

export function useUserDetails(userId: number) {
  const { users } = useUserStore()

  const user = useMemo(
    () => users.find((u) => u.id === userId),
    [users, userId]
  )

  const balances: Balance[] = useMemo(
    () => (balancesData as any)[userId.toString()] || [],
    [userId]
  )

  const transactions: Transaction[] = useMemo(
    () => (transactionsData as any)[userId.toString()] || [],
    [userId]
  )

  return { user, balances, transactions }
}