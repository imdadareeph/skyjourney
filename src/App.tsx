import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import SearchResults from '@/pages/SearchResults';
import Navbar from '@/components/Navbar';
import FlightSearchForm from '@/components/FlightSearchForm';
import Footer from '@/components/Footer';
import '@/App.css';
import '@/index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <div className="relative flex min-h-screen flex-col">
              <div className="full-width-container">
                <Navbar />
              </div>
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<FlightSearchForm />} />
                  <Route path="/search-results" element={<SearchResults />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <div className="full-width-container">
                <Footer />
              </div>
            </div>
          </div>
          <Toaster />
          <Sonner />
          <Analytics />
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
