import React from 'react';
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Camera,
  Users,
  BriefcaseBusiness,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary-charcoal py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-jakarta font-bold text-2xl tracking-tighter uppercase mb-6">
              Blue Cube
            </h3>
            <p className="text-white/50 text-sm font-inter leading-relaxed mb-8">
              Excellence in garment manufacturing. Powered by the generation-spanning legacy of <strong>Sri Raghavendra Fashions</strong>, Bangalore.
            </p>
            <div className="flex items-center gap-x-4">
              {[Camera, Users, BriefcaseBusiness].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2 bg-white/5 hover:bg-accent-blue text-white rounded-sm transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6 font-jakarta">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Collections', 'Heritage', 'Wholesale'].map((link) => (
                <li key={link}>
                  <a href={`/#${link.toLowerCase()}`} className="text-white/50 text-sm hover:text-accent-blue transition-colors font-medium font-inter">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6 font-jakarta">HQ Address</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-x-3 text-white/50 text-sm leading-relaxed font-inter">
                <MapPin className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/7Wno4k22ePtHX7QE7?g_st=awb" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-accent-blue transition-colors"
                >
                  #03, 12th A'Main Road,<br />
                  Kamakshipalya, Bangalore,<br />
                  Karnataka, India - 560079
                </a>
              </div>
              <div className="flex items-center gap-x-3 text-white/50 text-sm font-inter">
                <Phone className="w-5 h-5 text-accent-blue shrink-0" />
                <a href="tel:+919980126185" className="hover:text-white transition-colors">+91 9980126185</a>
              </div>
              <div className="flex items-center gap-x-3 text-white/50 text-sm font-inter">
                <Mail className="w-5 h-5 text-accent-blue shrink-0" />
                <a href="mailto:info@bluecube.in" className="hover:text-white transition-colors">info@bluecube.in</a>
              </div>
            </div>
          </div>

          {/* Support/CTA */}
          <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6">Wholesale Support</h4>
            <p className="text-white/60 text-xs mb-6 leading-relaxed">
              Inquire about bulk orders or manufacturing partnerships directly via WhatsApp.
            </p>
            <a
              href="https://wa.me/919980126185"
              target="_blank"
              rel="noreferrer"
              className="mt-auto group inline-flex items-center justify-center gap-x-2 py-4 px-6 rounded-sm bg-[#25D366] text-white text-sm font-bold hover:bg-[#1ebd5b] transition-all shadow-xl shadow-[#1ebd5b]/10"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
            &copy; {new Date().getFullYear()} Blue Cube by Sri Raghavendra Fashions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-x-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors">Privacy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors">Terms</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
