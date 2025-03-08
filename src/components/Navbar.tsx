
import { useState } from "react";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  const navLinks = [
    { label: "Book", href: "#" },
    { label: "Destinations", href: "#" },
    { label: "Experience", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className={`text-2xl font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            SkyJourney
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`hover:text-accent transition-colors ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              className={`hover:text-accent ${
                !isScrolled ? "text-white hover:bg-white" : ""
              }`}
            >
              Sign In
            </Button>
            <Button
              className={!isScrolled ? "bg-white text-primary hover:bg-white/90" : ""}
            >
              <User className="mr-2 h-4 w-4" />
              Register
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="md:hidden"
                size="icon"
              >
                <Menu
                  className={`h-6 w-6 ${
                    isScrolled ? "text-primary" : "text-white"
                  }`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Button variant="ghost" className="hover:text-accent">Sign In</Button>
                <Button>
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
