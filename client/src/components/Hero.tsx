import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Github, ExternalLink } from "lucide-react";

export default function Hero() {
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

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Building the Future of
            <motion.span 
              className="block text-[var(--emerald-light)] mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Web Development
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            We create modern, scalable web solutions that drive business growth. 
            From full-stack development to cloud hosting and SEO optimization.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <Button 
              size="lg" 
              className="bg-[var(--emerald)] hover:bg-[var(--emerald-light)] text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <a href="#contact" className="flex items-center">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-[var(--emerald-light)] text-[var(--emerald-light)] hover:bg-[var(--emerald-light)] hover:text-gray-900 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <a href="#portfolio" className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                View Our Work
              </a>
            </Button>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-[var(--emerald-light)]">200+</div>
              <div className="text-gray-300 text-sm">Projects Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-[var(--emerald-light)]">150+</div>
              <div className="text-gray-300 text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-[var(--emerald-light)]">5+</div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
              <div className="text-2xl font-bold text-[var(--emerald-light)]">99%</div>
              <div className="text-gray-300 text-sm">Client Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-[var(--emerald-light)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--emerald-light)] rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}