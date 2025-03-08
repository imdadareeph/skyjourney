
import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    image: "photo-1512453979798-5ea266f8880c",
    price: "From $299",
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "photo-1513635269975-59663e0ac1ad",
    price: "From $499",
  },
  {
    city: "Paris",
    country: "France",
    image: "photo-1502602898657-3e91760cbb34",
    price: "From $449",
  },
];

const DestinationsShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Card key={destination.city} className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0 relative">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={`https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=800`}
                alt={destination.city}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-semibold">{destination.city}</h3>
                <p className="text-sm opacity-90">{destination.country}</p>
                <p className="text-sm font-medium mt-2">{destination.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DestinationsShowcase;
