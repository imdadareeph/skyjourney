import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Check, Download, ChevronRight, Printer } from 'lucide-react'
import Footer from '@/components/Footer'
import BookingNavbar from '@/components/BookingNavbar'

export default function BookingConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { searchParams, selectedOutbound, selectedInbound, totalPrice, bookingReference } = location.state || {
    searchParams: { tripType: 'round-trip', passengers: 1 },
    totalPrice: 2060,
    bookingReference: 'SJ' + Math.random().toString().slice(2, 8)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BookingNavbar />
      
      <div className="flex-grow mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-[#0078D2] text-white p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-[#0078D2]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Booking Confirmed</h1>
            <p className="mt-2 text-lg">Thank you for choosing SkyJourney</p>
            <p className="mt-4 text-xl font-semibold">Booking Reference: {bookingReference}</p>
          </div>
          
          {/* Booking Details */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
            
            {/* Passenger Info */}
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Passenger</p>
                  <p className="font-medium">Mr Skyjourney Booking</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Reference</p>
                  <p className="font-medium">{bookingReference}</p>
                </div>
              </div>
            </div>
            
            {/* Flight Details */}
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Flight Details</h3>
              
              {/* Outbound Flight */}
              <div className="border-b pb-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#0078D2] text-white rounded-full flex items-center justify-center font-bold mr-3">SJ</div>
                    <div>
                      <p className="font-medium">Outbound Flight</p>
                      <p className="text-sm text-gray-500">Thursday, 8 May 2025</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-right text-gray-500">Confirmation Number</p>
                    <p className="font-medium">{selectedOutbound?.flightId || 'SJ389'}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <div className="text-xl font-bold">14:15</div>
                    <div className="text-lg">Dubai (DXB)</div>
                    <div className="text-sm text-gray-500">Terminal 3</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500">7h 25m</div>
                    <div className="flex items-center justify-center my-2">
                      <div className="w-24 h-[1px] bg-gray-300"></div>
                      <div className="mx-2">✈</div>
                      <div className="w-24 h-[1px] bg-gray-300"></div>
                    </div>
                    <div className="text-sm text-gray-600">Non-stop</div>
                  </div>
                  
                  <div>
                    <div className="text-xl font-bold">18:40</div>
                    <div className="text-lg">London Heathrow (LHR)</div>
                    <div className="text-sm text-gray-500">Terminal 2</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium">SJ {selectedOutbound?.flightId || '389'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aircraft</p>
                    <p className="font-medium">A380</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">
                      {selectedOutbound?.class === 'premiumEconomy' ? 'Premium Economy' : 
                        selectedOutbound?.class ? (selectedOutbound.class.charAt(0).toUpperCase() + selectedOutbound.class.slice(1)) : 'Economy'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fare Type</p>
                    <p className="font-medium">{selectedOutbound?.fareType || 'Flex'}</p>
                  </div>
                </div>
              </div>
              
              {/* Return Flight (conditional) */}
              {searchParams.tripType === 'round-trip' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-[#0078D2] text-white rounded-full flex items-center justify-center font-bold mr-3">SJ</div>
                      <div>
                        <p className="font-medium">Return Flight</p>
                        <p className="text-sm text-gray-500">Friday, 15 May 2025</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-right text-gray-500">Confirmation Number</p>
                      <p className="font-medium">{selectedInbound?.flightId || 'SJ398'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <div className="text-xl font-bold">09:10</div>
                      <div className="text-lg">London Heathrow (LHR)</div>
                      <div className="text-sm text-gray-500">Terminal 2</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-500">7h 25m</div>
                      <div className="flex items-center justify-center my-2">
                        <div className="w-24 h-[1px] bg-gray-300"></div>
                        <div className="mx-2">✈</div>
                        <div className="w-24 h-[1px] bg-gray-300"></div>
                      </div>
                      <div className="text-sm text-gray-600">Non-stop</div>
                    </div>
                    
                    <div>
                      <div className="text-xl font-bold">17:35</div>
                      <div className="text-lg">Dubai (DXB)</div>
                      <div className="text-sm text-gray-500">Terminal 3</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-sm text-gray-500">Flight</p>
                      <p className="font-medium">SJ {selectedInbound?.flightId || '398'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Aircraft</p>
                      <p className="font-medium">A380</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="font-medium">
                        {selectedInbound?.class === 'premiumEconomy' ? 'Premium Economy' : 
                          selectedInbound?.class ? (selectedInbound.class.charAt(0).toUpperCase() + selectedInbound.class.slice(1)) : 'Economy'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fare Type</p>
                      <p className="font-medium">{selectedInbound?.fareType || 'Flex'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment Summary */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="border-b pb-3 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Base fare</span>
                      <span>AED {(totalPrice * 0.8).toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="border-b pb-3 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Taxes and fees</span>
                      <span>AED {(totalPrice * 0.2).toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total amount paid</span>
                    <span>AED {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Need help with your booking?</h4>
                  <p className="text-sm text-gray-600 mb-4">Our customer service team is available 24/7 to assist you with any questions or changes to your booking.</p>
                  <Button className="w-full bg-[#0078D2] hover:bg-[#0078D2]/90">
                    Contact Support
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="p-4">
                  <div className="h-12 w-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-[#0078D2]">1</div>
                  <h4 className="font-medium mb-2">Check-in Online</h4>
                  <p className="text-sm text-gray-600">Check-in opens 48 hours before your flight</p>
                </div>
                <div className="p-4">
                  <div className="h-12 w-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-[#0078D2]">2</div>
                  <h4 className="font-medium mb-2">Prepare Documents</h4>
                  <p className="text-sm text-gray-600">Ensure your passport and visa are valid</p>
                </div>
                <div className="p-4">
                  <div className="h-12 w-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center text-[#0078D2]">3</div>
                  <h4 className="font-medium mb-2">Pack Wisely</h4>
                  <p className="text-sm text-gray-600">Review baggage allowance and restrictions</p>
                </div>
              </div>
            </div>
            
            {/* Return to Home */}
            <div className="mt-10 text-center">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-[#0078D2] hover:bg-[#0078D2]/90 text-white"
                onClick={() => navigate('/')}
              >
                Return to Home
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
} 