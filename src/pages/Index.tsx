
import FlightSearchForm from "@/components/FlightSearchForm";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center p-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop)`,
        }}
      >
        <div className="container max-w-7xl mx-auto space-y-8 animate-slide-up">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Your Journey Begins Here
            </h1>
            <p className="text-xl opacity-90">
              Experience premium travel at its finest
            </p>
          </div>
          <FlightSearchForm />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 px-6">
        <div className="container max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Popular Destinations
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most beloved travel destinations
            </p>
          </div>
          <DestinationsShowcase />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
