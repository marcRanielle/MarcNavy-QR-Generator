import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Globe } from "lucide-react";

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/share/1A25DXb1bt/", icon: Facebook },
  { name: "Instagram", url: "https://www.instagram.com/marc_navy?igsh=MXhvenpzYjJ2a3BkYw==", icon: Instagram },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/marc-ranielle-rabanillo-8a39ab247/", icon: Linkedin },
  { name: "Gmail", url: "mailto:marcnavy.web@gmail.com", icon: Mail },
  { name: "Website", url: "marcranielle.vercel.web", icon: Globe },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">About MarcNavy</h4>
            <p className="text-sm leading-relaxed opacity-80">
              MarcNavy is a web projects I created to gain practical experience and improve my skills in developing applications.
               It has helped me learn how to build user-friendly interfaces, implement interactive features, and apply best coding practices.
            </p>
            <p className="text-xs mt-6 opacity-50">&copy; {currentYear} MarcNavy. All rights reserved.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#generator" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Generator</a></li>
              <li><a href="#howitworks" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">How It Works</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Our Mission</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <p className="text-sm mb-4 opacity-80">Need support or have a feature request?</p>
            <a href="mailto:marcnavy.web@gmail.com" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              marcnavy.web@gmail.com
            </a>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon; // assign the component
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
