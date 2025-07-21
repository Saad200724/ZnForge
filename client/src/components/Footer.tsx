import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Zn</span>
              </div>
              <span className="text-xl font-bold">ZnForge</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Building the future of web development with innovative solutions 
              that drive business growth and create exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/znforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/znforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/znforge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@znforge.dev"
                className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#services" className="hover:text-[var(--emerald)] transition-colors">
                  Full-Stack Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--emerald)] transition-colors">
                  VPS Hosting Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--emerald)] transition-colors">
                  SEO Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--emerald)] transition-colors">
                  Custom Web Applications
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--emerald)] transition-colors">
                  Technical Consulting
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#about" className="hover:text-[var(--emerald)] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[var(--emerald)] transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[var(--emerald)] transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--emerald)] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[var(--emerald)] transition-colors">
                  Admin Panel
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <span className="text-gray-400">Email:</span><br />
                hello@znforge.dev
              </p>
              <p>
                <span className="text-gray-400">Phone:</span><br />
                +1 (555) 123-4567
              </p>
              <p>
                <span className="text-gray-400">Location:</span><br />
                San Francisco, CA<br />
                United States
              </p>
            </div>
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="#contact"
                className="inline-block bg-[var(--emerald)] hover:bg-[var(--emerald-light)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Start Your Project
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-1 text-sm text-gray-400 mb-4 md:mb-0">
            <span>© {new Date().getFullYear()} ZnForge. Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in San Francisco</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[var(--emerald)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--emerald)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[var(--emerald)] transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}