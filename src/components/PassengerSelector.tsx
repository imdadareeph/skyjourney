import React from 'react'
import { Button } from "@/components/ui/button"
import { Plus, Minus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PassengerSelectorProps {
  value: number
  onChange: (value: number, counts: { adult: number, child: number, infant: number }) => void
  maxPassengers?: number
}

interface PassengerType {
  type: 'adult' | 'child' | 'infant'
  count: number
  label: string
  description: string
  min: number
  max: number
}

export default function PassengerSelector({ value, onChange, maxPassengers = 9 }: PassengerSelectorProps) {
  const [passengerTypes, setPassengerTypes] = React.useState<PassengerType[]>([
    { type: 'adult', count: 1, label: 'Adults', description: '12 years and above', min: 1, max: 9 },
    { type: 'child', count: 0, label: 'Children', description: '2-11 years', min: 0, max: 8 },
    { type: 'infant', count: 0, label: 'Infants', description: 'Under 2 years', min: 0, max: 1 }
  ]);

  const handleIncrement = (type: 'adult' | 'child' | 'infant') => {
    setPassengerTypes(prev => {
      const newTypes = prev.map(pt => {
        if (pt.type === type) {
          const newCount = Math.min(pt.count + 1, pt.max);
          return { ...pt, count: newCount };
        }
        return pt;
      });
      
      const total = newTypes.reduce((sum, pt) => sum + pt.count, 0);
      const counts = {
        adult: newTypes.find(pt => pt.type === 'adult')?.count || 0,
        child: newTypes.find(pt => pt.type === 'child')?.count || 0,
        infant: newTypes.find(pt => pt.type === 'infant')?.count || 0
      };
      onChange(total, counts);
      return newTypes;
    });
  };

  const handleDecrement = (type: 'adult' | 'child' | 'infant') => {
    setPassengerTypes(prev => {
      const newTypes = prev.map(pt => {
        if (pt.type === type) {
          const newCount = Math.max(pt.count - 1, pt.min);
          return { ...pt, count: newCount };
        }
        return pt;
      });
      
      const total = newTypes.reduce((sum, pt) => sum + pt.count, 0);
      const counts = {
        adult: newTypes.find(pt => pt.type === 'adult')?.count || 0,
        child: newTypes.find(pt => pt.type === 'child')?.count || 0,
        infant: newTypes.find(pt => pt.type === 'infant')?.count || 0
      };
      onChange(total, counts);
      return newTypes;
    });
  };

  return (
    <div className="space-y-4 bg-white">
      {passengerTypes.map((pt) => (
        <div key={pt.type} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{pt.label}</span>
              <span className="text-sm text-gray-500">{pt.description}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-100"
              onClick={() => handleDecrement(pt.type)}
              disabled={pt.count <= pt.min}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium text-gray-900">{pt.count}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white hover:bg-gray-100"
              onClick={() => handleIncrement(pt.type)}
              disabled={pt.count >= pt.max || value >= maxPassengers}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
} 