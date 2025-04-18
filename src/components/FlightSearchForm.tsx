import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plane, User, ChevronDown } from "lucide-react"
import Select, { StylesConfig } from 'react-select'
import airportConfig from '@/config/airportConfig.json'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import PassengerSelector from './PassengerSelector'

interface Airport {
  code: string
  name: string
  city: string
  country: string
}

interface AirportOption {
  value: string
  label: string
  airport: Airport
}

type TripType = 'round-trip' | 'one-way' | 'multi-city';

export default function FlightSearchForm() {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState<TripType>('round-trip')
  const [date, setDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [origin, setOrigin] = useState<AirportOption | null>(null)
  const [destination, setDestination] = useState<AirportOption | null>(null)
  const [passengers, setPassengers] = useState(1)
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 1,
    child: 0,
    infant: 0
  })

  const airportOptions: AirportOption[] = airportConfig.airports.map(airport => ({
    value: airport.code,
    label: `${airport.code} - ${airport.city} (${airport.name})`,
    airport: airport
  }))

  const customStyles: StylesConfig<AirportOption, false> = {
    control: (base) => ({
      ...base,
      borderWidth: '2px',
      borderRadius: '0.5rem',
      minHeight: '40px',
      backgroundColor: 'white',
      opacity: 1
    }),
    option: (base, state) => ({
      ...base,
      padding: '8px 12px',
      backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
      color: 'black',
      opacity: 1,
      '&:hover': {
        backgroundColor: '#f3f4f6'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
      zIndex: 999,
      opacity: 1
    }),
    placeholder: (base) => ({
      ...base,
      opacity: 1,
      color: '#4b5563'
    }),
    input: (base) => ({
      ...base,
      opacity: 1
    })
  }

  const handlePassengerChange = (total: number, counts: { adult: number, child: number, infant: number }) => {
    setPassengers(total)
    setPassengerCounts(counts)
  }

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (tripType === 'round-trip' && !returnDate) {
      toast({
        title: "Return Date Required",
        description: "Please select a return date for round-trip flights",
        variant: "destructive",
      })
      return
    }

    const searchParams = {
      departureCode: origin.value,
      arrivalCode: destination.value,
      departureDate: date.toISOString(),
      returnDate: returnDate?.toISOString(),
      passengers,
      tripType,
      passengerCounts
    }

    navigate('/search-results', { state: searchParams })
  }

  return (
    <>
      <div 
        className="hero-section relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop")',
          height: '600px'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Your Journey Begins Here
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
            Discover amazing destinations and book your next adventure with SkyJourney
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-20 mb-12">
        <div className="w-full max-w-4xl mx-auto p-8 space-y-6 bg-white rounded-xl shadow-lg">
          {/* Trip Type Selection */}
          <RadioGroup 
            defaultValue="round-trip" 
            className="flex gap-6"
            onValueChange={(value) => setTripType(value as TripType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip">Round trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way">One way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" />
              <Label htmlFor="multi-city">Multi-city</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From and To Section */}
            <div>
              <Label>From</Label>
              <div className="mt-1">
                <Select
                  className="select-origin"
                  value={origin}
                  onChange={(option) => {
                    setOrigin(option);
                    document.querySelector('.select-origin')?.classList.remove('required-field-missing');
                  }}
                  options={airportOptions.filter(opt => opt.value !== destination?.value)}
                  styles={customStyles}
                  placeholder={
                    <div className="flex items-center">
                      <Plane className="mr-2 h-4 w-4 shrink-0" />
                      Select departure airport
                    </div>
                  }
                  isClearable
                  isSearchable
                />
              </div>
            </div>

            <div>
              <Label>To</Label>
              <div className="mt-1">
                <Select
                  className="select-destination"
                  value={destination}
                  onChange={(option) => {
                    setDestination(option);
                    document.querySelector('.select-destination')?.classList.remove('required-field-missing');
                  }}
                  options={airportOptions.filter(opt => opt.value !== origin?.value)}
                  styles={customStyles}
                  placeholder={
                    <div className="flex items-center">
                      <Plane className="mr-2 h-4 w-4 shrink-0" />
                      Select arrival airport
                    </div>
                  }
                  isClearable
                  isSearchable
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Departure Date */}
            <div>
              <Label>Departure</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-2 mt-1 bg-white opacity-100 button-departure",
                      !date && "text-gray-600"
                    )}
                    onClick={() => {
                      document.querySelector('.button-departure')?.classList.remove('required-field-missing');
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white opacity-100" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      // If return date exists and is before the new departure date, reset it
                      if (tripType === 'round-trip' && returnDate && newDate && newDate > returnDate) {
                        setReturnDate(undefined);
                      }
                    }}
                    initialFocus
                    className="bg-white"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === 'round-trip' && (
              <div>
                <Label>Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-2 mt-1 bg-white opacity-100 button-return",
                        !returnDate && "text-gray-600"
                      )}
                      onClick={() => {
                        document.querySelector('.button-return')?.classList.remove('required-field-missing');
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white opacity-100" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      className="bg-white"
                      disabled={(day) => {
                        // Disable dates before the departure date or before today
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        return day < today || (date ? day < date : false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div>
              <Label>Passengers</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between border-2 focus:border-[#0078D2] focus:ring-0"
                  >
                    {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-4">
                  <PassengerSelector
                    value={passengers}
                    onChange={handlePassengerChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button 
            className="w-full bg-red-500 hover:bg-red-600 text-white" 
            size="lg"
            onClick={handleSearch}
          >
            Search flights
          </Button>
        </div>
      </div>

      <style>{`
        .required-field-missing {
          border-color: #e11d48 !important; /* red-600 */
          background-color: #fef2f2 !important; /* red-50 without opacity */
          box-shadow: 0 0 0 1px #e11d48 !important; /* red-600 */
        }
      `}</style>
    </>
  )
}
