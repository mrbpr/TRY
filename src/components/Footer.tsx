import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <HeartIcon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">TRY IT</span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed max-w-md">
              Empowering students with comprehensive digital mental health support, 
              resources, and tools for a healthier, happier academic journey.
            </p>
            <div className="bg-red-500 text-white p-4 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold text-sm mb-2">Crisis Support 24/7</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Suicide Prevention: 9152987821</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Emergency: 112</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>AASRA: 9820466726</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
                { name: 'Dashboard', href: '/dashboard' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-blue-300" />
                <span className="text-blue-100">support@tryit-mental.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-blue-300" />
                <span className="text-blue-100">+91-80-46110007</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-blue-300 mt-0.5" />
                <span className="text-blue-100">
                  Mental Health Support Center<br />
                  Bangalore, Karnataka<br />
                  India - 560001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-100 text-sm">
              © 2024 TRY IT Mental Health Platform. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-blue-100 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-blue-100 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;