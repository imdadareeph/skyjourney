import React from 'react'
import FlightSearchForm from "@/components/FlightSearchForm";
import DestinationsShowcase from "@/components/DestinationsShowcase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <Navbar />
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="/images/hero-bg.jpg"
              alt="SkyJourney Hero"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Welcome to SkyJourney</span>
                <span className="block text-[#0078D2]">Your Journey Begins Here</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Experience luxury and comfort in the skies. Book your next adventure with SkyJourney.
              </p>
            </div>
            <div className="mt-12">
              <FlightSearchForm />
            </div>
          </div>
        </section>
        <DestinationsShowcase />
      </main>
      <Footer />
    </div>
  )
}

export default Index
