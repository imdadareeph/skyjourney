import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { ChevronDown, ChevronUp, Plane, Check } from 'lucide-react'
import flightData from '@/data/flightData.json'
import Footer from '@/components/Footer'

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {type === 'outbound' ? 'Outbound Flight' : 'Return Flight'}
            <span className="text-sm font-normal text-gray-600 ml-2">
              {format(new Date(type === 'outbound' ? searchParams.departureDate : searchParams.returnDate!), "EEE, d MMM yyyy")}
            </span>
          </h2>
          {selectedFlight && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (type === 'outbound') {
                  setSelectedOutbound(null);
                } else {
                  setSelectedInbound(null);
                }
                setExpandedFlightId(null);
              }}
            >
              Change flight
            </Button>
          )}
        </div>
        {flights.map((flight) => (
          <div
            key={`${flight.id}-${type}`}
            className={`flight-card bg-white rounded-lg shadow transition-all ${
              (type === 'outbound' ? selectedOutbound?.flightId : selectedInbound?.flightId) === flight.id 
                ? 'border-2 border-green-500' 
                : ''
            }`}
          >
            {/* Flight Header */}
            <div className="p-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Time and Route */}
                <div className="col-span-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-xl font-semibold">{flight.departureTime}</div>
                      <div className="text-sm text-gray-600">
                        {type === 'outbound' ? searchParams.departureCode : searchParams.arrivalCode}
                      </div>
                    </div>
                    <div className="flex-1 border-t-2 border-gray-300 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Plane className={`plane-icon w-5 h-5 text-gray-400 ${type === 'inbound' ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{flight.arrivalTime}</div>
                      <div className="text-sm text-gray-600">
                        {type === 'outbound' ? searchParams.arrivalCode : searchParams.departureCode}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {flight.classes[selectedClass].duration} • {flight.stopType}
                  </div>
                </div>

                {/* Flight Details */}
                <div className="col-span-4">
                  <div className="text-sm">
                    <div>Flight {flight.id}</div>
                    <div>{flight.aircraft}</div>
                  </div>
                </div>

                {/* Price and Select */}
                <div className="col-span-4 text-right">
                  <div className="price-highlight text-2xl font-semibold">
                    AED {flight.classes[selectedClass].fares[0].price}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(flight.id)}
                    className="mt-2"
                  >
                    {expandedFlightId === flight.id ? (
                      <>
                        Hide details <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show details <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedFlightId === flight.id && (
                <div className="mt-6 border-t pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    {flight.classes[selectedClass].fares.map((fare) => (
                      <div
                        key={fare.fareType}
                        className="border rounded-lg p-4 hover:border-primary"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{fare.fareType}</h3>
                          <div className="text-xl font-bold">AED {fare.price}</div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Baggage</span>
                            <span>{fare.baggage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cabin baggage</span>
                            <span>{fare.cabinBaggage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Seat selection</span>
                            <span>{fare.seatSelection}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Change fee</span>
                            <span>{fare.changeFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Refund fee</span>
                            <span>{fare.refundFee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Skywards Miles</span>
                            <span>{fare.skywardsMiles}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={() => handleSelectFare(flight.id, fare.fareType, fare.price, type)}
                        >
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Flight Summary */}
              {((type === 'outbound' ? selectedOutbound?.flightId : selectedInbound?.flightId) === flight.id) && !expandedFlightId && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">Selected: </span>
                      {selectedClass === 'premiumEconomy' ? 'Premium Economy' : 
                        selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} • {
                        type === 'outbound' ? selectedOutbound?.fareType : selectedInbound?.fareType
                      }
                    </div>
                    <div className="text-lg font-semibold">
                      AED {(type === 'outbound' ? selectedOutbound?.price : selectedInbound?.price)?.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {searchParams.departureCode} → {searchParams.arrivalCode}
                  {searchParams.tripType === 'round-trip' && ` → ${searchParams.departureCode}`}
                </div>
                <div className="text-gray-600">
                  {format(new Date(searchParams.departureDate), "EEE, d MMM yyyy")}
                  {searchParams.tripType === 'round-trip' && searchParams.returnDate && (
                    <> - {format(new Date(searchParams.returnDate), "EEE, d MMM yyyy")}</>
                  )}
                </div>
              </div>
              <div className="text-right">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setShowSummary(true)}
                  disabled={!isComplete}
                >
                  View summary
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                {searchParams.tripType === 'one-way' ? 'One way' : 'Round trip'} • {searchParams.passengers} passenger{searchParams.passengers > 1 ? 's' : ''}
              </div>
              <div className="text-gray-600">
                {isComplete ? (
                  <span className="text-primary font-semibold">
                    Selected: AED {totalPrice.toLocaleString()}
                  </span>
                ) : (
                  <span>
                    from AED {Math.min(...flightData.flights.map(f => 
                      f.classes[selectedClass].fares[0].price
                    )).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Class Selection */}
        <div className="mb-6 bg-white rounded-lg p-4 shadow">
          <div className="flex gap-4">
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
                className="flex-1"
              >
                {classType === 'premiumEconomy' ? 'Premium Economy' : 
                  classType.charAt(0).toUpperCase() + classType.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Flight Lists */}
        <div className="space-y-8">
          {renderFlightList('outbound')}
          {searchParams.tripType === 'round-trip' && renderFlightList('inbound')}
        </div>
      </div>

      {/* Summary Dialog */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Trip Summary</DialogTitle>
          </DialogHeader>

          {isComplete && selectedOutboundDetails && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="bg-green-50 p-4 rounded-lg flex items-center gap-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="text-lg">Flight{searchParams.tripType === 'round-trip' ? 's' : ''} selected successfully</span>
              </div>

              {/* Flight Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Flight details</h2>
                
                {/* Outbound Flight */}
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-600">Outbound</div>
                    <div className="text-xl font-semibold">
                      {format(new Date(searchParams.departureDate), "EEEE, d MMMM yyyy")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{selectedOutboundDetails.departureTime}</div>
                      <div className="text-lg">{searchParams.departureCode}</div>
                    </div>

                    <div className="text-center text-gray-600">
                      <div>{selectedOutboundDetails.classes[selectedOutbound.class].duration}</div>
                      <div>Non-stop</div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold">{selectedOutboundDetails.arrivalTime}</div>
                      <div className="text-lg">{searchParams.arrivalCode}</div>
                    </div>
                  </div>

                  <div className="text-gray-600">
                    Flight number
                    <span className="float-right font-semibold text-black">
                      A380 {selectedOutboundDetails.id}
                    </span>
                  </div>
                </div>

                {/* Return Flight */}
                {searchParams.tripType === 'round-trip' && selectedInbound && selectedInboundDetails && (
                  <div className="space-y-4 mt-8">
                    <div>
                      <div className="text-gray-600">Return</div>
                      <div className="text-xl font-semibold">
                        {format(new Date(searchParams.returnDate!), "EEEE, d MMMM yyyy")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{selectedInboundDetails.departureTime}</div>
                        <div className="text-lg">{searchParams.arrivalCode}</div>
                      </div>

                      <div className="text-center text-gray-600">
                        <div>{selectedInboundDetails.classes[selectedInbound.class].duration}</div>
                        <div>Non-stop</div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold">{selectedInboundDetails.arrivalTime}</div>
                        <div className="text-lg">{searchParams.departureCode}</div>
                      </div>
                    </div>

                    <div className="text-gray-600">
                      Flight number
                      <span className="float-right font-semibold text-black">
                        A380 {selectedInboundDetails.id}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-4 pt-4">
                <h2 className="text-xl font-semibold">Price details</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Cabin class</span>
                    <span className="font-semibold">
                      {selectedClass === 'premiumEconomy' ? 'Premium Economy' : 
                        selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outbound fare</span>
                    <span className="font-semibold">{selectedOutbound.fareType}</span>
                  </div>
                  {searchParams.tripType === 'round-trip' && selectedInbound && (
                    <div className="flex justify-between">
                      <span>Return fare</span>
                      <span className="font-semibold">{selectedInbound.fareType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Passengers</span>
                    <span className="font-semibold">
                      {searchParams.passengers} Adult{searchParams.passengers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 text-xl font-bold">
                    <span>Total price</span>
                    <span>AED {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowSummary(false)}
                >
                  Close
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Continue to payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
} 