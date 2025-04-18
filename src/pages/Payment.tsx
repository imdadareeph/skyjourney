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
  const { searchParams, selectedOutbound, selectedInbound, totalPrice, passengers } = location.state || {
    searchParams: { tripType: 'round-trip', passengers: 1 },
    totalPrice: 2060,
    passengers: []
  }
  const [showSummary, setShowSummary] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('full')
  const [additionalAddressLines, setAdditionalAddressLines] = useState<string[]>([])

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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#0078D2] rounded-full flex items-center justify-center">
            <Check className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Review your selection</h1>
        </div>
        
        <div className="mt-6 bg-gradient-to-br from-white to-blue-50 border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <h2 className="font-semibold text-xl text-gray-900">Flights</h2>
              <p className="text-sm text-gray-600 mt-1">Review your flight details and fare conditions</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                For 1 passenger (including airfare, taxes, fees and carrier-imposed charges)
              </div>
              <div className="text-xl font-bold text-[#0078D2] mt-1">
                AED {totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-gray-900">Thu 8 May 25</span>
                  <span className="px-2 py-1 bg-blue-50 text-[#0078D2] text-sm rounded-full">Outbound</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-2">14:15</div>
                <div className="text-gray-600 mt-1">Dubai (DXB)</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-500">7h 25m</div>
                <div className="flex items-center justify-center my-3">
                  <div className="w-24 h-[1px] bg-gray-300"></div>
                  <div className="mx-2 text-[#0078D2]">✈</div>
                  <div className="w-24 h-[1px] bg-gray-300"></div>
                </div>
                <div className="text-sm text-gray-600">Non-stop</div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900">Thu 8 May 25</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-2">18:40</div>
                <div className="text-gray-600 mt-1">London Heathrow (LHR)</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Class / Fare:</div>
                <div className="font-medium text-gray-900">Economy / Flex</div>
              </div>
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t text-sm">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-[#0078D2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700">Checked baggage: 30kg</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-[#0078D2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700">Change fee: AED 240</span>
                <span className="text-gray-500">No-show penalty AED 480</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-[#0078D2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 14L4 9L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-700">Refund fee: AED 370</span>
                <span className="text-gray-500">No-show penalty AED 740</span>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers Section */}
        <div className="mt-8 bg-gradient-to-br from-white to-blue-50 border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#0078D2] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Passengers ({searchParams.passengers} {searchParams.passengers === 1 ? 'Adult' : 'Adults'})</h2>
          </div>
          <div className="border-t pt-4 space-y-4">
            {passengers.map((passenger, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {passenger.firstName} {passenger.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Seat: {12 + index}A
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SkyJourney Foundation Section */}
        <div className="mt-8 bg-gradient-to-br from-white to-blue-50 border-2 border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
              <div>
                <span className="font-medium text-gray-900">Donate to the SkyJourney Airline Foundation</span>
                <p className="text-sm text-gray-500 mt-1">Support humanitarian and community projects worldwide</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-2 hover:border-[#0078D2] hover:bg-blue-50">
              Show
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Payment Options Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Payment options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentOptions.map((option) => (
              <div 
                key={option.id}
                className={`border-2 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  option.selected 
                    ? 'border-[#0078D2] bg-gradient-to-br from-blue-50 to-white shadow-md' 
                    : 'border-gray-200 hover:border-[#0078D2]/50'
                }`}
                onClick={() => setSelectedPaymentOption(option.id)}
              >
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  {option.selected && (
                    <div className="w-6 h-6 rounded-full bg-[#0078D2] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 12 12">
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
            <div className="md:col-span-2 border-2 rounded-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
                <h3 className="text-lg font-semibold mb-4">Choose payment method</h3>
                
                <div 
                  className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    paymentMethod === 'credit' 
                      ? 'bg-white border-2 border-[#0078D2] shadow-md' 
                      : 'border-2 border-gray-200 hover:border-[#0078D2]/50'
                  }`}
                  onClick={() => setPaymentMethod('credit')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                    paymentMethod === 'credit' ? 'border-[#0078D2]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'credit' && (
                      <div className="w-3 h-3 rounded-full bg-[#0078D2]"></div>
                    )}
                  </div>
                  <span className="font-medium">Credit/Debit card</span>
                  <div className="ml-auto">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="border-t rounded-b-xl bg-white p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Card Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                    <Input 
                      placeholder="0000 0000 0000 0000" 
                      className="border-2 focus:border-[#0078D2] focus:ring-0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name (as it appears on card)</label>
                    <Input 
                      placeholder="Enter cardholder name" 
                      className="border-2 focus:border-[#0078D2] focus:ring-0"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                      <Input 
                        placeholder="MM / YYYY" 
                        className="border-2 focus:border-[#0078D2] focus:ring-0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <Input 
                        placeholder="000" 
                        className="border-2 focus:border-[#0078D2] focus:ring-0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Billing address</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country / territory</label>
                      <Select>
                        <SelectTrigger className="border-2 focus:border-[#0078D2] focus:ring-0">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input 
                        placeholder="Enter address" 
                        className="border-2 focus:border-[#0078D2] focus:ring-0"
                      />
                    </div>
                    
                    {additionalAddressLines.map((line, index) => (
                      <div key={index}>
                        <Input 
                          placeholder="Additional address line" 
                          className="border-2 focus:border-[#0078D2] focus:ring-0"
                        />
                      </div>
                    ))}
                    
                    <div>
                      <Button 
                        variant="outline" 
                        className="gap-2 border-2 hover:border-[#0078D2] hover:bg-blue-50"
                        onClick={() => {
                          if (additionalAddressLines.length < 2) {
                            setAdditionalAddressLines([...additionalAddressLines, '']);
                          }
                        }}
                        disabled={additionalAddressLines.length >= 2}
                      >
                        <Plus className="h-4 w-4" />
                        Add address line
                      </Button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City / town</label>
                      <Input 
                        placeholder="Enter city" 
                        className="border-2 focus:border-[#0078D2] focus:ring-0"
                      />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">You can choose to pay in any of the supported currencies below:</p>
                      <Select>
                        <SelectTrigger className="border-2 focus:border-[#0078D2] focus:ring-0">
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
            
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 rounded-xl p-6 h-fit">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-medium text-gray-700">Total to be paid:</span>
                <span className="text-2xl font-bold text-[#0078D2]">AED {totalPrice.toLocaleString()}</span>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>• Secure payment processing</p>
                <p>• 24/7 customer support</p>
                <p>• Instant booking confirmation</p>
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
                  bookingReference,
                  passengers: passengers || []
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