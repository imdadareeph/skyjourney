
import { ChevronRight, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const bookingLinks = [
    { label: "Manage Booking", href: "#" },
    { label: "Online Check-in", href: "#" },
    { label: "Flight Status", href: "#" },
    { label: "Change Booking", href: "#" },
    { label: "Refund Status", href: "#" },
  ];

  const travelLinks = [
    { label: "Special Offers", href: "#" },
    { label: "Travel Insurance", href: "#" },
    { label: "Travel Requirements", href: "#" },
    { label: "Baggage Information", href: "#" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: Mail, text: "support@skyjourney.com", href: "mailto:support@skyjourney.com" },
    { icon: MapPin, text: "123 Aviation Blvd, New York, NY 10001", href: "#" },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">SkyJourney</h3>
            <p className="text-gray-300">
              Experience premium travel with our world-class service and
              destinations.
            </p>
            <div className="space-y-2">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Booking Management */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Booking Management</h3>
            <ul className="space-y-2">
              {bookingLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Travel Information</h3>
            <ul className="space-y-2">
              {travelLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2024 SkyJourney. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
