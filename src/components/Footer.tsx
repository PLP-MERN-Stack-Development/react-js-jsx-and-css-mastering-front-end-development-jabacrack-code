import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@taskflow.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded"></div>
              <span className="font-bold text-gray-800 dark:text-white">TaskFlow</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Master React with modern tools and best practices
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
