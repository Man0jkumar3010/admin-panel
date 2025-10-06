'use client'

import Link from 'next/link'
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import { User } from '@/types/user'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { useUserStore } from '@/store/user-store'
import { useMemo } from 'react'

interface UserTableProps {
  users: User[]
  sortConfig: { key: keyof User | null; direction: 'asc' | 'desc' }
  onSort: (key: keyof User) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  startIndex: number
  endIndex: number
  totalItems: number
}

export function UserTable({
  users,
  sortConfig,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
}: UserTableProps) {
  const { 
    selectedUsers, 
    toggleSelectUser, 
    selectUsersOnPage, 
    deselectUsersOnPage 
  } = useUserStore()

  const currentPageUserIds = useMemo(() => users.map(u => u.id), [users])

  const allCurrentPageSelected = useMemo(() => {
    if (users.length === 0) return false
    return currentPageUserIds.every(id => selectedUsers.has(id))
  }, [currentPageUserIds, selectedUsers, users.length])

  const someCurrentPageSelected = useMemo(() => {
    if (users.length === 0) return false
    return currentPageUserIds.some(id => selectedUsers.has(id)) && !allCurrentPageSelected
  }, [currentPageUserIds, selectedUsers, allCurrentPageSelected, users.length])

  const getKycBadgeVariant = (status: string) => {
    const variants = {
      Approved: 'default',
      Pending: 'secondary',
      Rejected: 'destructive',
    } as const
    return variants[status as keyof typeof variants] || 'default'
  }

  const SortIcon = ({ column }: { column: keyof User }) => {
    if (sortConfig.key !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    )
  }

  const handleSelectAllOnPage = () => {
    if (allCurrentPageSelected) {
      deselectUsersOnPage(currentPageUserIds)
    } else {
      selectUsersOnPage(currentPageUserIds)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allCurrentPageSelected}
                  onCheckedChange={handleSelectAllOnPage}
                  aria-label="Select all on current page"
                  className={someCurrentPageSelected ? "data-[state=checked]:bg-primary" : ""}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>KYC Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => onSort('balance')}
                  className="flex items-center h-auto p-0 hover:bg-transparent"
                >
                  Balance (USD)
                  <SortIcon column="balance" />
                </Button>
              </TableHead>
              <TableHead>
                {/* <Button
                  variant="ghost"
                  onClick={() => onSort('last_login')}
                  className="flex items-center h-auto p-0 hover:bg-transparent"
                > */}
                  Last Login
                  {/* <SortIcon column="last_login" />
                </Button> */}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-muted-foreground"
                >
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getKycBadgeVariant(user.kyc_status)}>
                      {user.kyc_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(user.balance)}
                  </TableCell>
                  <TableCell>{formatDate(user.last_login)}</TableCell>
                  <TableCell>
                    <Link href={`/users/${user.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex} to {endIndex} of {totalItems} users
            {selectedUsers.size > 0 && (
              <span className="ml-2 font-medium text-primary">
                ({selectedUsers.size} selected)
              </span>
            )}
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}