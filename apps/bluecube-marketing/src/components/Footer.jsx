import React from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-800 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-2xl tracking-tight mb-6">BLUE CUBE </h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              <br /> <b> Feel the Costume</b> <br />
              Precision garment manufacturing powered by Sri Raghavendra Fashions. Elevating wholesale standards.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 font-light">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Heritage</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span>
                  Blue Cube<br />
                  Sri Raghavendra Fashions<br />
                  03, 12th A'Main Road,Kamakshipalya<br />
                  Bangalore, Karnataka 560079
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <a href="mailto:info@bluecube.in" className="hover:text-white transition-colors">info@bluecube.in</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <a href="tel:+919980126185" className="hover:text-white transition-colors">+91 9980126185

                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Support</h4>
            <p className="text-sm font-light text-gray-400 leading-relaxed mb-6">
              Need immediate assistance? Reach out to our wholesale support team directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/919980126185"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-sm font-medium transition-colors w-full sm:w-auto shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-light">
            &copy; {new Date().getFullYear()} Blue Cube by Sri Raghavendra Fashions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
