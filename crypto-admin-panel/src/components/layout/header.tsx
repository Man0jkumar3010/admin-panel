'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h2 className="text-xl font-semibold">Dashboard</h2>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
            M
          </div>
        </div>
      </div>
    </header>
  )
}