import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Plane, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import flightData from '@/data/flightData.json'
import Footer from '@/components/Footer'
import ItineraryBar from '@/components/ItineraryBar'

interface SearchParams {
  departureCode: string
  arrivalCode: string
  departureDate: string
  returnDate?: string
  passengers: number
  tripType: 'one-way' | 'round-trip'
}

interface SelectedFlight {
  flightId: string
  class: string
  fareType: string
  price: number
  type: 'outbound' | 'inbound'
}

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state as SearchParams
  const [selectedClass, setSelectedClass] = useState('economy')
  const [selectedOutbound, setSelectedOutbound] = useState<SelectedFlight | null>(null)
  const [selectedInbound, setSelectedInbound] = useState<SelectedFlight | null>(null)
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null)
  const [showSummary, setShowSummary] = useState(false)

  const handleSelectFare = (flightId: string, fareType: string, price: number, type: 'outbound' | 'inbound') => {
    const newSelection = {
      flightId,
      class: selectedClass,
      fareType,
      price,
      type
    }
    
    if (type === 'outbound') {
      setSelectedOutbound(newSelection)
    } else {
      setSelectedInbound(newSelection)
    }
    setExpandedFlightId(null)
  }

  const toggleExpand = (flightId: string) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId)
  }

  // Find the selected flight details from flightData
  const selectedOutboundDetails = selectedOutbound 
    ? flightData.flights.find(f => f.id === selectedOutbound.flightId)
    : null

  const selectedInboundDetails = selectedInbound
    ? flightData.flights.find(f => f.id === selectedInbound.flightId)
    : null

  const totalPrice = (selectedOutbound?.price || 0) + (selectedInbound?.price || 0)
  const isComplete = searchParams.tripType === 'one-way' 
    ? !!selectedOutbound 
    : !!selectedOutbound && !!selectedInbound

  const renderFlightList = (type: 'outbound' | 'inbound') => {
    const selectedFlight = type === 'outbound' ? selectedOutbound : selectedInbound;
    const flights = selectedFlight 
      ? flightData.flights.filter(f => f.id === selectedFlight.flightId)
      : flightData.flights;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl">
            Thursday, 10 April 2025
            <span className="text-sm text-gray-600 ml-2">
              {!selectedFlight ? '(6 options)' : ''}
            </span>
          </div>
          {!selectedFlight && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {!selectedFlight && (
          <div className="flex items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">Show prices for:</div>
            <div className="flex gap-2">
              {['economy', 'premiumEconomy', 'business', 'first'].map((classType) => (
                <Button
                  key={classType}
                  variant={selectedClass === classType ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedClass(classType)
                    setSelectedOutbound(null)
                    setSelectedInbound(null)
                    setExpandedFlightId(null)
                  }}
                  className={`rounded-full px-6 ${
                    selectedClass === classType 
                      ? 'bg-[#0078D2] hover:bg-[#0078D2] text-white border-none' 
                      : 'border-gray-300'
                  }`}
                >
                  {classType === 'premiumEconomy' ? 'Premium Economy' : 
                    classType.charAt(0).toUpperCase() + classType.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        )}

        {flights.map((flight) => {
          const isSelected = (type === 'outbound' ? selectedOutbound?.flightId : selectedInbound?.flightId) === flight.id;
          const isExpanded = expandedFlightId === `${flight.id}-${type}`;
          
          return (
            <div
              key={`${flight.id}-${type}`}
              className={`mt-6 bg-white rounded-lg border ${
                isSelected ? 'border-[#2B8000]' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-2xl font-semibold">{flight.departureTime}</div>
                        <div className="text-gray-600">{type === 'outbound' ? 'DXB' : 'LHR'}</div>
                        <div className="text-sm text-gray-600">{type === 'outbound' ? 'Dubai' : 'London Heathrow'}</div>
                      </div>

                      <div className="flex-1 relative">
                        <div className="border-t border-gray-300 w-full absolute top-4"></div>
                        <div className="text-sm text-gray-600 text-center mt-6">
                          {flight.classes[selectedClass].duration}
                        </div>
                        <div className="text-sm text-gray-600 text-center">
                          Non-stop
                        </div>
                      </div>

                      <div>
                        <div className="text-2xl font-semibold">{flight.arrivalTime}</div>
                        <div className="text-gray-600">{type === 'outbound' ? 'LHR' : 'DXB'}</div>
                        <div className="text-sm text-gray-600">{type === 'outbound' ? 'London Heathrow' : 'Dubai'}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-600">Flight number</div>
                      <div className="font-medium">{flight.id}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    {isSelected ? (
                      <div>
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#2B8000]"></div>
                          <span className="text-[#2B8000]">Selected</span>
                        </div>
                        <div className="text-sm mb-4">
                          {selectedClass === 'premiumEconomy' ? 'Premium Economy' : 
                            selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} • {
                            type === 'outbound' ? selectedOutbound?.fareType : selectedInbound?.fareType
                          }
                        </div>
                        <Button
                          variant="link"
                          className="text-[#0078D2] p-0 h-auto text-sm"
                          onClick={() => {
                            if (type === 'outbound') {
                              setSelectedOutbound(null);
                            } else {
                              setSelectedInbound(null);
                            }
                            setExpandedFlightId(null);
                          }}
                        >
                          Change selection
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-gray-600 mb-1">
                          {selectedClass === 'premiumEconomy' ? 'Premium Economy' : 
                            selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Class
                        </div>
                        <div className="text-2xl font-semibold mb-1">
                          from AED {flight.classes[selectedClass].fares[0].price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Lowest price</div>
                        <Button
                          variant="link"
                          className="text-[#0078D2] p-0 h-auto text-sm mt-2"
                          onClick={() => toggleExpand(`${flight.id}-${type}`)}
                        >
                          {isExpanded ? (
                            <>Hide details</>
                          ) : (
                            <>Show details</>
                          )}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && !isSelected && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-6">
                      {flight.classes[selectedClass].fares.map((fare) => (
                        <div
                          key={fare.fareType}
                          className="border rounded-lg p-6 transition-colors border-gray-200 hover:border-[#0078D2]"
                        >
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">{fare.fareType}</h3>
                            <div className="text-xl font-bold">AED {fare.price.toLocaleString()}</div>
                          </div>
                          <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Baggage</span>
                              <span className="font-medium">{fare.baggage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cabin baggage</span>
                              <span className="font-medium">{fare.cabinBaggage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Seat selection</span>
                              <span className="font-medium">{fare.seatSelection}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Change fee</span>
                              <span className="font-medium">{fare.changeFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Refund fee</span>
                              <span className="font-medium">{fare.refundFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Skywards Miles</span>
                              <span className="font-medium">{fare.skywardsMiles}</span>
                            </div>
                          </div>
                          <Button
                            className="w-full mt-6 bg-[#0078D2] hover:bg-[#0078D2]/90"
                            onClick={() => handleSelectFare(flight.id, fare.fareType, fare.price, type)}
                          >
                            Select
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ItineraryBar 
        departureCode="DXB"
        departureName="Dubai"
        arrivalCode="LHR"
        arrivalName="London Heathrow"
        tripType={searchParams.tripType}
        passengers={searchParams.passengers}
        showViewSummary={true}
        isComplete={isComplete}
        totalPrice={isComplete ? totalPrice : Math.min(...flightData.flights.map(f => 
          f.classes[selectedClass].fares[0].price
        ))}
        onViewSummary={() => setShowSummary(true)}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Outbound Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Choose your outbound flight
            <span className="text-[#D92626] ml-1">*</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Inclusive of airfare, taxes, fees and carrier imposed charges
          </p>
          {renderFlightList('outbound')}
        </div>

        {/* Inbound Section */}
        {searchParams.tripType === 'round-trip' && (
          <div className="mt-12">
            <h1 className="text-3xl font-bold mb-2">
              Choose your inbound flight
              <span className="text-[#D92626] ml-1">*</span>
            </h1>
            <p className="text-gray-600 mb-8">
              Inclusive of airfare, taxes, fees and carrier imposed charges
            </p>
            {renderFlightList('inbound')}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button 
            size="lg"
            className={`px-8 py-6 text-lg ${
              isComplete 
                ? 'bg-[#0078D2] hover:bg-[#0078D2]/90 text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isComplete}
            onClick={() => navigate('/passengers', { 
              state: { 
                searchParams, 
                selectedOutbound, 
                selectedInbound, 
                totalPrice 
              } 
            })}
          >
            Continue to add passengers
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
            {isComplete && selectedOutboundDetails && (
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
                        <div className="text-base font-bold">{selectedOutboundDetails.departureTime}</div>
                        <div className="text-sm">DXB</div>
                      </div>

                      <div className="text-center text-gray-600 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-[1px] w-12 bg-gray-300"></div>
                          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                          <div className="h-[1px] w-12 bg-gray-300"></div>
                        </div>
                        <div className="mt-0.5">{selectedOutboundDetails.classes[selectedOutbound.class].duration}</div>
                        <div>Non-stop</div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold">{selectedOutboundDetails.arrivalTime}</div>
                        <div className="text-sm">LHR</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mt-3">
                      Flight number
                      <span className="float-right font-medium text-black">
                        A380 {selectedOutboundDetails.id}
                      </span>
                    </div>
                  </div>

                  {/* Return Flight for Round Trip */}
                  {searchParams.tripType === 'round-trip' && selectedInbound && selectedInboundDetails && (
                    <div className="border rounded-lg p-4 mt-3">
                      <div>
                        <div className="text-gray-600 text-xs">Return</div>
                        <div className="text-sm font-medium">
                          {format(new Date(searchParams.returnDate!), "EEEE, d MMMM yyyy")}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <div className="text-base font-bold">{selectedInboundDetails.departureTime}</div>
                          <div className="text-sm">LHR</div>
                        </div>

                        <div className="text-center text-gray-600 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="h-[1px] w-12 bg-gray-300"></div>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div className="h-[1px] w-12 bg-gray-300"></div>
                          </div>
                          <div className="mt-0.5">{selectedInboundDetails.classes[selectedInbound.class].duration}</div>
                          <div>Non-stop</div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold">{selectedInboundDetails.arrivalTime}</div>
                          <div className="text-sm">DXB</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 mt-3">
                        Flight number
                        <span className="float-right font-medium text-black">
                          A380 {selectedInboundDetails.id}
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
                        {selectedClass === 'premiumEconomy' ? 'Premium Economy' : 
                          selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}
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
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
} 