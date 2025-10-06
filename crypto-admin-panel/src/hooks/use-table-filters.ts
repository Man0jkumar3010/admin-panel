import { useState, useMemo, useCallback, useEffect } from 'react'
import { User } from '@/types/user'

export function useTableFilters(data: User[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [kycFilter, setKycFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const filteredData = useMemo(() => {
    let filtered = [...data]

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    
    if (kycFilter !== 'All') {
      filtered = filtered.filter((user) => user.kyc_status === kycFilter)
    }

  
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key!]
        const bVal = b[sortConfig.key!]

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchQuery, kycFilter, sortConfig])

  const toggleSort = useCallback((key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    kycFilter,
    setKycFilter,
    sortConfig,
    toggleSort,
    filteredData,
  }
}