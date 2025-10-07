import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User, KYCStatus } from '@/types/user'

interface UserState {
  users: User[]
  selectedUsers: Set<number>
  loading: boolean
  error: string | null

  
  setUsers: (users: User[]) => void
  toggleSelectUser: (id: number) => void
  selectUsersOnPage: (userIds: number[]) => void 
  deselectUsersOnPage: (userIds: number[]) => void
  clearSelection: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateKYCStatus: (userId: number, status: KYCStatus) => Promise<void>
  suspendUser: (userId: number) => Promise<void>
  suspendMultipleUsers: (userIds: number[]) => Promise<void>
}

export const useUserStore = create<UserState>()(
      (set, get) => ({
        users: [],
        selectedUsers: new Set(),
        loading: false,
        error: null,

        setUsers: (users) => set({ users }),
        
        toggleSelectUser: (id) =>
          set((state) => {
            const newSet = new Set(state.selectedUsers)
            if (newSet.has(id)) {
              newSet.delete(id)
            } else {
              newSet.add(id)
            }
            return { selectedUsers: newSet }
          }),
        selectUsersOnPage: (userIds) =>
          set((state) => {
            const newSet = new Set(state.selectedUsers)
            userIds.forEach((id) => newSet.add(id))
            return { selectedUsers: newSet }
          }),


        deselectUsersOnPage: (userIds) =>
          set((state) => {
            const newSet = new Set(state.selectedUsers)
            userIds.forEach((id) => newSet.delete(id))
            return { selectedUsers: newSet }
          }),

        clearSelection: () => set({ selectedUsers: new Set() }),

        setLoading: (loading) => set({ loading }),

        setError: (error) => set({ error }),

        updateKYCStatus: async (userId, status) => {
          set({ loading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            set((state) => ({
              users: state.users.map((u) =>
                u.id === userId ? { ...u, kyc_status: status } : u
              ),
              loading: false,
            }))
          } catch (error) {
            set({
              error: 'Failed to update KYC status',
              loading: false,
            })
            throw error
          }
        },

        suspendUser: async (userId) => {
          set({ loading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            set({ loading: false })
          } catch (error) {
            set({
              error: 'Failed to suspend user',
              loading: false,
            })
            throw error
          }
        },

        suspendMultipleUsers: async (userIds) => {
          set({ loading: true, error: null })
          try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            
            set({ 
              loading: false,
              selectedUsers: new Set()
            })
          } catch (error) {
            set({
              error: 'Failed to suspend users',
              loading: false,
            })
            throw error
          }
        },
      }),
)