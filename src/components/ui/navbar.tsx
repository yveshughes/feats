'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Formal Elements Art Therapy Scale
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/technology" className="text-gray-700 hover:text-gray-900">
              Technology
            </Link>
            <Link href="/try-it">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold">
                Try It
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
            <Link href="/technology" className="block text-gray-700 hover:text-gray-900 py-2 text-base font-medium">
              Technology
            </Link>
            <div className="pt-2">
              <Link href="/try-it">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold">
                  Try It
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}