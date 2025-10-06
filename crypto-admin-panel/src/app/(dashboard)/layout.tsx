'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { Toaster } from 'sonner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
      <Toaster 
        position="bottom-right" 
        richColors 
        expand={true}
        closeButton
      />
    </div>
  )
}