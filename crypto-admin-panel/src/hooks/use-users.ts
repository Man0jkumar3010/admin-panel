'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/user-store'
import usersData from '@/mocks/data/users.json'

export function useUsers() {
  const { users, setUsers, loading, error } = useUserStore()

  useEffect(() => {
    if (users.length === 0) {
      setUsers(usersData)
    }
  }, [users.length, setUsers])

  return { users, loading, error }
}