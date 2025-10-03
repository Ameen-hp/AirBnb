import React from 'react';
import { Mail, MapPin, Twitter, Instagram, Facebook, Globe } from 'lucide-react';

// Helper component for consistent link styling
const FooterLink = ({ to, children }) => (
    <a href={to} className="text-white/80 hover:text-yellow-300 transition-colors duration-200 text-sm font-light">
        {children}
    </a>
);

// Define link sections
const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Newsroom', path: '/news' },
    { name: 'Gift Cards', path: '/gifts' },
];

const hostingLinks = [
    { name: 'Host Your Home', path: '/host/signup' },
    { name: 'Host Resources', path: '/host/resources' },
    { name: 'Community Forum', path: '/host/forum' },
    { name: 'Responsible Hosting', path: '/host/responsible' },
];

const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Safety Information', path: '/safety' },
    { name: 'Cancellation Options', path: '/cancellations' },
    { name: 'Support COVID-19', path: '/support/covid' },
];

/**
 * Enhanced, multi-column, responsive footer component with red branding.
 */
function Footer() {
  return (
    <footer className="bg-red-900 text-white shadow-2xl mt-8 pt-10 border-t border-red-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 pb-10 border-b border-red-800">
          
          {/* Section 1: Brand & Contact */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
                <Globe className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-extrabold tracking-wider">
                  Air<span className="text-white">bnb</span> Clone
                </span>
            </div>
            <p className="text-sm text-white/70">
              Discover unique homes and experiences worldwide.
            </p>
            <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-yellow-300" />
                    <p className="text-white/80">San Francisco, CA</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-yellow-300" />
                    <p className="text-white/80">contact@airbnbclone.com</p>
                </div>
            </div>
          </div>
          
          {/* Section 2: Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-300 border-b border-red-700 pb-1">Company</h3>
            <div className="flex flex-col space-y-3">
              {companyLinks.map(link => (
                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
              ))}
            </div>
          </div>

          {/* Section 3: Hosting Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-300 border-b border-red-700 pb-1">Hosting</h3>
            <div className="flex flex-col space-y-3">
              {hostingLinks.map(link => (
                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
              ))}
            </div>
          </div>
          
          {/* Section 4: Support Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-300 border-b border-red-700 pb-1">Support</h3>
            <div className="flex flex-col space-y-3">
              {supportLinks.map(link => (
                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar (Copyright and Socials) */}
        <div className="flex flex-col md:flex-row justify-between items-center py-5">
            <p className="text-sm text-white/70 order-2 md:order-1 mt-4 md:mt-0">
                &copy; {new Date().getFullYear()} AirBnb Clone. All rights reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-6 order-1 md:order-2">
                <a href="#" aria-label="Twitter" className="text-white hover:text-yellow-300 transition-colors duration-200">
                    <Twitter className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-white hover:text-yellow-300 transition-colors duration-200">
                    <Instagram className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Facebook" className="text-white hover:text-yellow-300 transition-colors duration-200">
                    <Facebook className="w-5 h-5" />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
