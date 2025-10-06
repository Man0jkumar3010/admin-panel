'use client'

import { UserTable } from '@/components/users/user-table'
import { UserFilters } from '@/components/users/user-filters'
import { useUsers } from '@/hooks/use-users'
import { useTableFilters } from '@/hooks/use-table-filters'
import { usePagination } from '@/hooks/use-pagination'
import { Card, CardContent } from '@/components/ui/card'

export default function UsersPage() {
  const { users, loading, error } = useUsers()
  const {
    searchQuery,
    setSearchQuery,
    kycFilter,
    setKycFilter,
    sortConfig,
    toggleSort,
    filteredData,
  } = useTableFilters(users)

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({
    data: filteredData,
    itemsPerPage: 10,
  })

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <p className="text-destructive">Error loading users: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        kycFilter={kycFilter}
        setKycFilter={setKycFilter}
      />

      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading users...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <UserTable
          users={paginatedData}
          sortConfig={sortConfig}
          onSort={toggleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      )}
    </div>
  )
}