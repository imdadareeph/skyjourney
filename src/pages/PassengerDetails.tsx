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
import StepIndicator, { Step } from '@/components/StepIndicator'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

interface Passenger {
  type: 'adult' | 'child' | 'infant'
  firstName: string
  lastName: string
  nationality: string
  dateOfBirth: Date | undefined
  passportNumber: string
  passportExpiry: Date | undefined
}

export default function PassengerDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const { searchParams, selectedOutbound, selectedInbound, totalPrice } = location.state || {
    searchParams: { tripType: 'round-trip', passengers: 1 },
    totalPrice: 2060
  }
  const [showSummary, setShowSummary] = useState(false)
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array(searchParams.passengers).fill({
      type: 'adult',
      firstName: '',
      lastName: '',
      nationality: '',
      dateOfBirth: undefined,
      passportNumber: '',
      passportExpiry: undefined
    })
  )

  const handlePassengerChange = (index: number, field: keyof Passenger, value: Passenger[keyof Passenger]) => {
    setPassengers(prev => {
      const newPassengers = [...prev]
      newPassengers[index] = {
        ...newPassengers[index],
        [field]: value
      }
      return newPassengers
    })
  }

  const handleSubmit = () => {
    // Validate all required fields for each passenger
    const hasEmptyFields = passengers.some(passenger => {
      const requiredFields = ['firstName', 'lastName', 'nationality', 'dateOfBirth', 'passportNumber', 'passportExpiry']
      return requiredFields.some(field => !passenger[field as keyof Passenger])
    })

    if (hasEmptyFields) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields for each passenger",
        variant: "destructive",
      })
      return
    }

    navigate('/options', {
      state: {
        searchParams,
        selectedOutbound,
        selectedInbound,
        totalPrice,
        passengers
      }
    })
  }

  const steps: Step[] = [
    { name: 'Search', status: 'complete' },
    { name: 'Flights', status: 'complete' },
    { name: 'Passengers', status: 'current' },
    { name: 'Options', status: 'upcoming' },
    { name: 'Payment', status: 'upcoming' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0078D2] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Passenger details</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
            {passengers.map((passenger, index) => (
              <div key={index} className="border-b pb-8 last:border-b-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Passenger {index + 1}</h2>
                  <Select
                    value={passenger.type}
                    onValueChange={(value: 'adult' | 'child' | 'infant') => handlePassengerChange(index, 'type', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select passenger type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adult">Adult (12+ years)</SelectItem>
                      <SelectItem value="child">Child (2-11 years)</SelectItem>
                      <SelectItem value="infant">Infant (Under 2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>First name</Label>
                    <Input
                      placeholder="Enter first name"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Last name</Label>
                    <Input
                      placeholder="Enter last name"
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Nationality</Label>
                    <Select
                      value={passenger.nationality}
                      onValueChange={(value) => handlePassengerChange(index, 'nationality', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Date of birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !passenger.dateOfBirth && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {passenger.dateOfBirth ? format(passenger.dateOfBirth, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={passenger.dateOfBirth}
                          onSelect={(date) => handlePassengerChange(index, 'dateOfBirth', date)}
                          initialFocus
                          disabled={(date) => {
                            const today = new Date()
                            const minDate = new Date()
                            minDate.setFullYear(today.getFullYear() - 120)
                            return date > today || date < minDate
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Passport number</Label>
                    <Input
                      placeholder="Enter passport number"
                      value={passenger.passportNumber}
                      onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Passport expiry date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !passenger.passportExpiry && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {passenger.passportExpiry ? format(passenger.passportExpiry, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={passenger.passportExpiry}
                          onSelect={(date) => handlePassengerChange(index, 'passportExpiry', date)}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-[#0078D2] hover:bg-[#0078D2]/90 text-white"
              >
                Continue to options
              </Button>
            </div>
          </div>
        </div>
      </main>

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

      <Footer />
    </div>
  )
} 