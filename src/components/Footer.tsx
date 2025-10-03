import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-extrabold">TRY IT</span>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed max-w-md text-lg font-light">
              Empowering students with comprehensive digital mental health support, resources, and tools for a healthier, happier academic journey.
            </p>
            <div className="bg-gradient-to-br from-rose-600 to-red-600 text-white p-6 rounded-2xl border-2 border-rose-500/50 shadow-xl">
              <h4 className="font-bold text-base mb-4">24/7 Crisis Support</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5" />
                  <span className="font-medium">Suicide Prevention: 9152987821</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5" />
                  <span className="font-medium">Emergency: 112</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5" />
                  <span className="font-medium">AASRA: 9820466726</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
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
                    className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <EnvelopeIcon className="h-6 w-6 text-sky-400" />
                <span className="text-slate-300 font-medium">support@tryit-mental.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-6 w-6 text-sky-400" />
                <span className="text-slate-300 font-medium">+91-80-46110007</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPinIcon className="h-6 w-6 text-sky-400 mt-1" />
                <span className="text-slate-300 font-medium leading-relaxed">
                  Mental Health Support Center<br />
                  Bangalore, Karnataka<br />
                  India - 560001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-slate-400 text-sm font-medium">
              © 2024 TRY IT Mental Health Platform. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
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