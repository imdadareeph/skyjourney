import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Search, HelpCircle, Globe, User } from 'lucide-react'

export default function BookingNavbar() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Main navbar */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center">
                <div className="h-10 w-10 bg-[#0078D2] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SJ
                </div>
              </Link>
            </div>
            <div className="ml-6 flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">BOOK</Link>
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">MANAGE</Link>
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">EXPERIENCE</Link>
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">WHERE WE FLY</Link>
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">LOYALTY</Link>
              <Link to="/" className="text-sm font-medium hover:text-[#0078D2]">HELP</Link>
            </div>
          </div>
          
          {/* Secondary navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#0078D2]">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#0078D2]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#0078D2]">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Link to="/login" className="flex items-center text-sm font-medium hover:text-[#0078D2]">
              <User className="h-5 w-5 mr-1" />
              LOG IN
            </Link>
          </div>
        </div>
      </div>
      
      {/* Secondary navbar */}
      <div className="bg-[#292929] border-t border-gray-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-xs hover:text-[#0078D2]">Help and contacts</Link>
              <Link to="/" className="text-xs hover:text-[#0078D2]">Your Ticket Details</Link>
              <Link to="/" className="text-xs hover:text-[#0078D2]">Your questions</Link>
            </div>
            <div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 px-3 py-1 h-7 rounded text-xs">
                Search flights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 