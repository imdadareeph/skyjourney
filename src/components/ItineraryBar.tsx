import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

interface ItineraryBarProps {
  departureCode: string
  departureName: string
  arrivalCode: string
  arrivalName: string
  tripType: 'one-way' | 'round-trip'
  passengers: number
  showViewSummary?: boolean
  isComplete?: boolean
  totalPrice?: number
  onViewSummary?: () => void
}

export default function ItineraryBar({
  departureCode,
  departureName,
  arrivalCode,
  arrivalName,
  tripType,
  passengers,
  showViewSummary = false,
  isComplete = false,
  totalPrice,
  onViewSummary
}: ItineraryBarProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-lg">
              <span className="font-medium">{departureName} ({departureCode})</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{arrivalName} ({arrivalCode})</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>•</span>
              <span className="mx-2">{tripType === 'one-way' ? 'One way' : 'Round trip'}</span>
              <span>•</span>
              <span className="ml-2">{passengers} passenger{passengers > 1 ? 's' : ''}</span>
            </div>
            <Button 
              variant="link" 
              className="text-[#0078D2] p-0 h-auto text-sm"
              onClick={() => navigate('/')}
            >
              Change search
            </Button>
          </div>
          {showViewSummary && (
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <span className="text-gray-600">Cost</span>
                <span className="ml-2 text-xl font-semibold">
                  AED {totalPrice?.toLocaleString()}
                </span>
              </div>
              <Button 
                variant="outline" 
                className={`border-[#0078D2] ${
                  isComplete 
                    ? 'text-[#0078D2] hover:bg-[#0078D2] hover:text-white' 
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
                onClick={onViewSummary}
                disabled={!isComplete}
              >
                View summary
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 