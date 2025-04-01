import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import SearchResults from '@/pages/SearchResults';
import Navbar from '@/components/Navbar';
import FlightSearchForm from '@/components/FlightSearchForm';
import Footer from '@/components/Footer';
import '@/App.css';
import '@/index.css';
import PassengerDetails from '@/pages/PassengerDetails';
import Options from '@/pages/Options';
import Payment from '@/pages/Payment';

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/search-results';

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        {showNavbar && (
          <div className="full-width-container">
            <Navbar />
          </div>
        )}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<FlightSearchForm />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/passengers" element={<PassengerDetails />} />
            <Route path="/options" element={<Options />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="full-width-container">
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <Sonner />
          <Analytics />
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
