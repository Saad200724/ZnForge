import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center geometric-bg">
      {/* Large 3D Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-[var(--emerald)] opacity-20 cube-3d"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-[var(--emerald-light)] opacity-30 transform rotate-45"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-32 w-20 h-20 bg-white opacity-10 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 border-2 border-[var(--emerald)] opacity-40 transform rotate-45"
        animate={{
          rotate: [45, 405],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-black mb-6 gradient-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Transform Your Digital Presence with ZnForge
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Full-stack web development, VPS services, and SEO optimization that drives results. We forge digital solutions that scale with your business.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            onClick={scrollToContact}
            className="bg-[var(--emerald)] hover:bg-[var(--emerald-dark)] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={scrollToServices}
            variant="outline"
            className="border-2 border-[var(--emerald)] text-[var(--emerald)] hover:bg-[var(--emerald)] hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            <Play className="mr-2 h-5 w-5" />
            View Services
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--emerald)] mb-2">24/7</div>
            <div className="text-gray-300">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--emerald)] mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--emerald)] mb-2">Fast</div>
            <div className="text-gray-300">Delivery</div>
          </div>
        </motion.div>
      </div>
      
      {/* Animated Wireframe Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-[var(--emerald)]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
}
