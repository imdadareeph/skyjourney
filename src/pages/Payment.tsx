import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Plus, CreditCard, Check } from 'lucide-react'
import ItineraryBar from '@/components/ItineraryBar'
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import StepIndicator from '@/components/StepIndicator'
import { Step } from '@/components/StepIndicator'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { searchParams, selectedOutbound, selectedInbound, totalPrice } = location.state || {
    searchParams: { tripType: 'round-trip', passengers: 1 },
    totalPrice: 2060
  }
  const [showSummary, setShowSummary] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('full')

  const steps: Step[] = [
    { name: 'Flights', status: 'complete', path: '/search-results' },
    { name: 'Passengers', status: 'complete', path: '/passengers' },
    { name: 'Options', status: 'complete', path: '/options' },
    { name: 'Payment', status: 'current', path: '/payment' },
  ]

  const paymentOptions = [
    {
      id: 'full',
      title: 'In full',
      description: 'Pay in full, using your preferred payment method',
      selected: selectedPaymentOption === 'full',
    },
    {
      id: 'cash-miles',
      title: 'Cash+Miles',
      description: 'Use Skywards Miles to reduce the total price',
      selected: selectedPaymentOption === 'cash-miles',
    },
    {
      id: 'hold',
      title: 'Hold Your Fare',
      description: 'Need more time to decide? Hold your fare for 72 hours',
      selected: selectedPaymentOption === 'hold',
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
      <StepIndicator 
        steps={steps} 
        onStepClick={(index, path) => {
          if (path) {
            navigate(path, { 
              state: { 
                searchParams, 
                selectedOutbound, 
                selectedInbound, 
                totalPrice 
              } 
            });
          }
        }}
      />

      {/* Flight Summary Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Review your selection</h1>
        
        <div className="mt-6 bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="font-semibold text-xl">Flights</h2>
            <div className="text-sm text-gray-500">
              For 1 passenger (including airfare, taxes, fees and carrier-imposed charges)
              <span className="ml-2 font-semibold text-black">Total: AED {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <span className="text-lg font-medium">Thu 8 May 25</span>
                </div>
                <div className="text-2xl font-semibold mt-1">14:15</div>
                <div className="text-gray-600">Dubai (DXB)</div>
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
                <div className="flex items-center">
                  <span className="text-lg font-medium">Thu 8 May 25</span>
                </div>
                <div className="text-2xl font-semibold mt-1">18:40</div>
                <div className="text-gray-600">London Heathrow (LHR)</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Class / Fare:</div>
                <div className="font-medium">Economy / Flex</div>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Checked baggage: 30kg</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Change fee: AED 240</span>
                <span className="ml-1 text-gray-500">No-show penalty AED 480</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Refund fee: AED 370</span>
                <span className="ml-1 text-gray-500">No-show penalty AED 740</span>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers Section */}
        <div className="mt-8 bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Passengers (1 Adult)</h2>
          <div className="border-t pt-4">
            <p className="text-lg">Mr Skyjourney Booking</p>
          </div>
        </div>

        {/* SkyJourney Foundation Section */}
        <div className="mt-8 bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">S</div>
              <span className="font-medium">Donate to the SkyJourney Airline Foundation</span>
            </div>
            <Button variant="outline" size="sm">
              Show
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Payment Options Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Payment options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentOptions.map((option) => (
              <div 
                key={option.id}
                className={`border p-6 rounded-lg cursor-pointer hover:border-[#0078D2] transition-all ${
                  option.selected ? 'border-[#0078D2] bg-blue-50' : ''
                }`}
                onClick={() => setSelectedPaymentOption(option.id)}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  {option.selected && (
                    <div className="w-5 h-5 rounded-full bg-[#0078D2] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                        <path fill="currentColor" d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Payment details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 border rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Choose payment method</h3>
                
                <div 
                  className="flex items-center p-4 border rounded-md cursor-pointer bg-blue-50 border-[#0078D2]"
                  onClick={() => setPaymentMethod('credit')}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-[#0078D2] flex items-center justify-center mr-3">
                    <div className="w-3 h-3 rounded-full bg-[#0078D2]"></div>
                  </div>
                  <span className="font-medium">Credit/Debit card</span>
                  <div className="ml-auto">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="border-t rounded-b-lg bg-gray-50 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Card Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Card number</label>
                    <Input placeholder="0000 0000 0000 0000" />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full name (as it appears on card)</label>
                    <Input placeholder="Enter cardholder name" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Expiry date</label>
                      <Input placeholder="MM / YYYY" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">CVV</label>
                      <Input placeholder="000" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Billing address</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Country / territory</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="gb">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <Input placeholder="Enter address" />
                    </div>
                    
                    <div>
                      <Button variant="outline" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add address line
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City / town</label>
                      <Input placeholder="Enter city" />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">You can choose to pay in any of the supported currencies below:</p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="AED UAE Dirham" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aed">AED UAE Dirham</SelectItem>
                          <SelectItem value="usd">USD US Dollar</SelectItem>
                          <SelectItem value="gbp">GBP British Pound</SelectItem>
                          <SelectItem value="eur">EUR Euro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6 h-fit">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-medium">Total to be paid:</span>
                <span className="text-xl font-bold">AED {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
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
            Back to Options
          </Button>
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-[#0078D2] hover:bg-[#0078D2]/90 text-white"
            onClick={() => {
              // Generate a random booking reference
              const bookingReference = 'SJ' + Math.random().toString().slice(2, 8);
              // Navigate to confirmation page
              navigate('/booking-confirmation', {
                state: {
                  searchParams,
                  selectedOutbound,
                  selectedInbound,
                  totalPrice,
                  bookingReference
                }
              });
            }}
          >
            Pay Now
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
                      A380 {selectedOutbound?.flightId || 'EK389'}
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
                        A380 {selectedInbound?.flightId || 'EK398'}
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
                        selectedOutbound?.class ? (selectedOutbound.class.charAt(0).toUpperCase() + selectedOutbound.class.slice(1)) : 'Economy'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outbound fare</span>
                    <span className="font-medium">{selectedOutbound?.fareType || 'Flex'}</span>
                  </div>
                  {searchParams.tripType === 'round-trip' && (
                    <div className="flex justify-between">
                      <span>Return fare</span>
                      <span className="font-medium">{selectedInbound?.fareType || 'Flex'}</span>
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