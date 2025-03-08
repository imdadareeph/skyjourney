
import { useState } from "react";
import { Calendar, PlaneLanding, PlaneTakeoff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const airports = [
  { code: "DXB", name: "Dubai International", city: "Dubai" },
  { code: "LHR", name: "Heathrow", city: "London" },
  { code: "JFK", name: "John F. Kennedy", city: "New York" },
  { code: "DEL", name: "Indira Gandhi International", city: "Delhi" },
  { code: "BOM", name: "Chhatrapati Shivaji", city: "Mumbai" },
  { code: "SIN", name: "Changi", city: "Singapore" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris" },
];

interface PassengerCount {
  adults: number;
  children: number;
  teens: number;
}

const FlightSearchForm = () => {
  const [tripType, setTripType] = useState("roundTrip");
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [openPassengers, setOpenPassengers] = useState(false);
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    teens: 0,
  });

  const totalPassengers = passengers.adults + passengers.children + passengers.teens;

  const updatePassengers = (type: keyof PassengerCount, value: number) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(9, value))
    }));
  };

  return (
    <Card className="w-full max-w-4xl backdrop-blur-sm bg-white/90 shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="space-y-6">
          <RadioGroup
            defaultValue="roundTrip"
            className="flex space-x-4"
            onValueChange={setTripType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roundTrip" id="roundTrip" />
              <Label htmlFor="roundTrip">Round trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oneWay" id="oneWay" />
              <Label htmlFor="oneWay">One way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiCity" id="multiCity" />
              <Label htmlFor="multiCity">Multi-city</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <div className="relative">
                <PlaneTakeoff className="absolute left-3 top-3 h-4 w-4 text-gray-500 z-10" />
                <Select value={fromAirport} onValueChange={setFromAirport}>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select departure airport" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {airports.map((airport) => (
                      <SelectItem 
                        key={airport.code} 
                        value={airport.code}
                        className="hover:bg-gray-100"
                      >
                        <span className="font-medium">{airport.code}</span> -{" "}
                        {airport.city} ({airport.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <div className="relative">
                <PlaneLanding className="absolute left-3 top-3 h-4 w-4 text-gray-500 z-10" />
                <Select value={toAirport} onValueChange={setToAirport}>
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select arrival airport" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {airports.map((airport) => (
                      <SelectItem 
                        key={airport.code} 
                        value={airport.code}
                        className="hover:bg-gray-100"
                      >
                        <span className="font-medium">{airport.code}</span> -{" "}
                        {airport.city} ({airport.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Departure</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
            </div>
            {tripType === "roundTrip" && (
              <div className="space-y-2">
                <Label>Return</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label>Passengers</Label>
              <Popover open={openPassengers} onOpenChange={setOpenPassengers}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      {totalPassengers} {totalPassengers === 1 ? 'passenger' : 'passengers'}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-500">Ages 18+</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('adults', passengers.adults - 1)}
                          disabled={passengers.adults <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengers.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('adults', passengers.adults + 1)}
                          disabled={passengers.adults >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Teens</p>
                        <p className="text-sm text-gray-500">Ages 12-17</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('teens', passengers.teens - 1)}
                          disabled={passengers.teens <= 0}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengers.teens}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('teens', passengers.teens + 1)}
                          disabled={passengers.teens >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-500">Ages 2-11</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('children', passengers.children - 1)}
                          disabled={passengers.children <= 0}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{passengers.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updatePassengers('children', passengers.children + 1)}
                          disabled={passengers.children >= 9}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button className="w-full bg-accent hover:bg-accent/90 text-white">
            Search flights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearchForm;
