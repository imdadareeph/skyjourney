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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Footer from '@/components/Footer'
import { format } from 'date-fns'

interface PassengerDetailsProps {
  title: string
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  passportNumber: string
  passportExpiry: string
  email: string
  phone: string
}

export default function PassengerDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { searchParams, selectedOutbound, selectedInbound, totalPrice } = location.state
  const [showSummary, setShowSummary] = useState(false)

  const steps = [
    { name: 'Flights', status: 'complete' },
    { name: 'Passengers', status: 'current' },
    { name: 'Options', status: 'upcoming' },
    { name: 'Payment', status: 'upcoming' },
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
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center" aria-label="Progress">
            <ol role="list" className="flex items-center space-x-8">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative">
                  {step.status === 'complete' ? (
                    <div className="group">
                      <span className="flex items-center">
                        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0078D2]">
                          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12">
                            <path fill="currentColor" d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                          </svg>
                        </span>
                        <span className="ml-4 text-sm font-medium text-[#0078D2]">{step.name}</span>
                      </span>
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="flex items-center" aria-current="step">
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#0078D2]">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0078D2]" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-[#0078D2]">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group">
                      <div className="flex items-center">
                        <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="h-2.5 w-2.5 rounded-full" />
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
                      </div>
                    </div>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                      <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                        <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Passenger Form */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Passenger Details</h2>
            <p className="mt-1 text-sm text-gray-600">Please enter the details for each passenger as they appear on their passport.</p>
          </div>

          <div className="space-y-6 bg-white p-8 border rounded-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <Select>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="mr">Mr</SelectItem>
                    <SelectItem value="mrs">Mrs</SelectItem>
                    <SelectItem value="ms">Ms</SelectItem>
                    <SelectItem value="miss">Miss</SelectItem>
                    <SelectItem value="dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <Input id="firstName" type="text" className="mt-1" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <Input id="lastName" type="text" className="mt-1" />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input id="dateOfBirth" type="date" className="mt-1" />
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
                <Select>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ae">United Arab Emirates</SelectItem>
                    <SelectItem value="gb">United Kingdom</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">Passport Number</label>
                <Input id="passportNumber" type="text" className="mt-1" />
              </div>
              <div>
                <label htmlFor="passportExpiry" className="block text-sm font-medium text-gray-700">Passport Expiry Date</label>
                <Input id="passportExpiry" type="date" className="mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input id="email" type="email" className="mt-1" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Input id="phone" type="tel" className="mt-1" />
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
            Return to Flights
          </Button>
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-[#0078D2] hover:bg-[#0078D2]/90 text-white"
            onClick={() => navigate('/options')}
          >
            Continue to Options
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

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
                      {format(new Date(searchParams.departureDate), "EEEE, d MMMM yyyy")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <div className="text-base font-bold">{selectedOutbound.departureTime}</div>
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
                      <div className="text-base font-bold">{selectedOutbound.arrivalTime}</div>
                      <div className="text-sm">LHR</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mt-3">
                    Flight number
                    <span className="float-right font-medium text-black">
                      A380 {selectedOutbound.flightId}
                    </span>
                  </div>
                </div>

                {/* Return Flight for Round Trip */}
                {searchParams.tripType === 'round-trip' && selectedInbound && (
                  <div className="border rounded-lg p-4 mt-3">
                    <div>
                      <div className="text-gray-600 text-xs">Return</div>
                      <div className="text-sm font-medium">
                        {format(new Date(searchParams.returnDate!), "EEEE, d MMMM yyyy")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <div className="text-base font-bold">{selectedInbound.departureTime}</div>
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
                        <div className="text-base font-bold">{selectedInbound.arrivalTime}</div>
                        <div className="text-sm">DXB</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mt-3">
                      Flight number
                      <span className="float-right font-medium text-black">
                        A380 {selectedInbound.flightId}
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
                      {selectedOutbound.class === 'premiumEconomy' ? 'Premium Economy' : 
                        selectedOutbound.class.charAt(0).toUpperCase() + selectedOutbound.class.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outbound fare</span>
                    <span className="font-medium">{selectedOutbound.fareType}</span>
                  </div>
                  {searchParams.tripType === 'round-trip' && selectedInbound && (
                    <div className="flex justify-between">
                      <span>Return fare</span>
                      <span className="font-medium">{selectedInbound.fareType}</span>
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
                <Button className="flex-1 bg-[#0078D2] hover:bg-[#0078D2]/90 h-9">
                  Continue to payment
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
} 