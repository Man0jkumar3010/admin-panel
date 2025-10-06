export type KYCStatus = 'Approved' | 'Pending' | 'Rejected'

export interface User {
  id: number
  name: string
  email: string
  kyc_status: KYCStatus | string
  balance: number
  last_login: string
  country: string
  joined_date: string
}

export interface Balance {
  asset: string
  amount: number
  usd_value: number
}

export interface Transaction {
  id: number
  date: string
  type: 'Deposit' | 'Withdraw'
  asset: string
  amount: number
  status: 'Completed' | 'Pending' | 'Failed'
}