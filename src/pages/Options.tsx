import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import ItineraryBar from '@/components/ItineraryBar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import Footer from '@/components/Footer'
import StepIndicator from '@/components/StepIndicator'

export default function Options() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showSummary, setShowSummary] = useState(false)
  const { searchParams, selectedOutbound, selectedInbound, totalPrice } = location.state || {
    searchParams: { tripType: 'round-trip', passengers: 1 },
    selectedOutbound: { class: 'economy', fareType: 'Flex', price: 1600 },
    selectedInbound: { class: 'economy', fareType: 'Flex', price: 460 },
    totalPrice: 2060
  }

  const steps = [
    { name: 'Flights', status: 'complete' },
    { name: 'Passengers', status: 'complete' },
    { name: 'Options', status: 'current' },
    { name: 'Payment', status: 'upcoming' },
  ]

  const ancillaries = [
    {
      title: 'Upgrade flights',
      description: 'Premium Economy Flex Plus',
      price: 2900,
      image: '/upgrade-seat.jpg',
      priceLabel: 'From AED',
    },
    {
      title: 'Choose seats',
      description: 'For a Regular seat',
      price: 0,
      image: '/choose-seats.jpg',
      priceLabel: 'From',
      priceText: 'Complimentary',
    },
    {
      title: 'Add additional baggage',
      description: 'For an additional 5 kg',
      price: 230,
      image: '/add-baggage.jpg',
      priceLabel: 'From AED',
    },
    {
      title: 'Add travel insurance plan',
      description: 'For standard travel insurance',
      price: 87,
      image: '/travel-insurance.jpg',
      priceLabel: 'AED',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <ItineraryBar 
        departureCode="DXB"
        departureName="Dubai"
        arrivalCode="LHR"
        arrivalName="London Heathrow"
        tripType={searchParams.tripType}
        passengers={searchParams.passengers}
        showViewSummary={true}
        isComplete={true}
        totalPrice={totalPrice}
        onViewSummary={() => setShowSummary(true)}
      />

      {/* Progress Indicator */}
      <StepIndicator steps={steps} />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Enhance your travel experience</h1>

        {/* Ancillaries Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ancillaries.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-lg border hover:border-[#0078D2] transition-colors">
              <div className="aspect-h-3 aspect-w-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <div className="mt-1 text-sm text-gray-500">{item.description}</div>
                <div className="mt-4">
                  <div className="text-xs text-gray-500">{item.priceLabel}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {item.priceText || item.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Passengers
          </Button>
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-[#0078D2] hover:bg-[#0078D2]/90 text-white"
            onClick={() => navigate('/payment', { state: { searchParams, selectedOutbound, selectedInbound, totalPrice } })}
          >
            Continue to Payment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <Footer />

      {/* Summary Dialog */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-[600px] p-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Trip Summary</DialogTitle>
              <DialogClose className="h-6 w-6 p-0 opacity-75 hover:opacity-100" />
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="space-y-4">
              {/* Success Message */}
              <div className="bg-[#E8F2E8] rounded-lg p-3 flex items-center gap-2">
                <Check className="h-4 w-4 text-[#2B8000]" />
                <span className="text-[#2B8000] text-sm">
                  Flight{searchParams.tripType === 'round-trip' ? 's' : ''} selected successfully
                </span>
              </div>

              {/* Flight Details */}
              <div>
                <h2 className="text-base font-semibold mb-3">Flight details</h2>
                
                {/* Outbound Flight */}
                <div className="border rounded-lg p-4">
                  <div>
                    <div className="text-gray-600 text-xs">Outbound</div>
                    <div className="text-sm font-medium">
                      Thursday, 8 May 2025
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <div className="text-base font-bold">14:15</div>
                      <div className="text-sm">DXB</div>
                    </div>

                    <div className="text-center text-gray-600 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-[1px] w-12 bg-gray-300"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <div className="h-[1px] w-12 bg-gray-300"></div>
                      </div>
                      <div className="mt-0.5">7 hrs 25 mins</div>
                      <div>Non-stop</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold">18:40</div>
                      <div className="text-sm">LHR</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mt-3">
                    Flight number
                    <span className="float-right font-medium text-black">
                      A380 {selectedOutbound?.flightId || 'SJ389'}
                    </span>
                  </div>
                </div>

                {/* Return Flight for Round Trip */}
                {searchParams.tripType === 'round-trip' && selectedInbound && (
                  <div className="border rounded-lg p-4 mt-3">
                    <div>
                      <div className="text-gray-600 text-xs">Return</div>
                      <div className="text-sm font-medium">
                        Friday, 15 May 2025
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <div className="text-base font-bold">09:10</div>
                        <div className="text-sm">LHR</div>
                      </div>

                      <div className="text-center text-gray-600 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-[1px] w-12 bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="h-[1px] w-12 bg-gray-300"></div>
                        </div>
                        <div className="mt-0.5">7 hrs 25 mins</div>
                        <div>Non-stop</div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold">17:35</div>
                        <div className="text-sm">DXB</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mt-3">
                      Flight number
                      <span className="float-right font-medium text-black">
                        A380 {selectedInbound?.flightId || 'SJ398'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="border rounded-lg p-4">
                <h2 className="text-base font-semibold mb-3">Price details</h2>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Cabin class</span>
                    <span className="font-medium">
                      {selectedOutbound?.class === 'premiumEconomy' ? 'Premium Economy' : 
                        selectedOutbound?.class.charAt(0).toUpperCase() + selectedOutbound?.class.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outbound fare</span>
                    <span className="font-medium">{selectedOutbound?.fareType}</span>
                  </div>
                  {searchParams.tripType === 'round-trip' && selectedInbound && (
                    <div className="flex justify-between">
                      <span>Return fare</span>
                      <span className="font-medium">{selectedInbound?.fareType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Passengers</span>
                    <span className="font-medium">
                      {searchParams.passengers} Adult{searchParams.passengers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold">
                    <span>Total price</span>
                    <span>AED {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-200 hover:bg-gray-50 h-9"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button className="flex-1 bg-[#0078D2] hover:bg-[#0078D2]/90 h-9"
                  onClick={() => {
                    setShowSummary(false);
                    navigate('/payment', { state: { searchParams, selectedOutbound, selectedInbound, totalPrice } });
                  }}
                >
                  Continue to payment
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 