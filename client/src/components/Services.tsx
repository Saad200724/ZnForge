import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, TrendingUp, Check } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Custom web applications built with modern technologies. From responsive front-end interfaces to robust back-end systems.",
    features: ["React & Vue.js", "Node.js & Python", "Database Design", "API Integration"],
    delay: 0
  },
  {
    icon: Server,
    title: "VPS Services",
    description: "Reliable virtual private server solutions with 24/7 monitoring, automated backups, and scalable infrastructure.",
    features: ["Cloud Hosting", "Server Management", "Performance Optimization", "Security Monitoring"],
    delay: 0.2
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies to improve your search rankings, drive organic traffic, and boost conversions.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics & Reporting"],
    delay: 0.4
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-20 w-40 h-40 bg-[var(--emerald)] opacity-5 cube-3d"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--emerald-light)] opacity-5 transform rotate-45"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-[var(--emerald)] mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to accelerate your business growth and online presence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              viewport={{ once: true }}
            >
              <Card className="group relative p-8 glass-effect bg-transparent border-white/10 hover:border-[var(--emerald)]/30 transition-all duration-500 transform hover:scale-105 h-full">
                {/* Animated background element */}
                <motion.div
                  className="absolute top-4 right-4 w-16 h-16 bg-[var(--emerald)]/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                
                <CardContent className="relative z-10 p-0">
                  <motion.div
                    className="w-16 h-16 bg-[var(--emerald)] rounded-lg flex items-center justify-center mb-6"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-[var(--emerald)] mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: service.delay + (featureIndex * 0.1) 
                        }}
                        viewport={{ once: true }}
                      >
                        <Check className="h-4 w-4 text-[var(--emerald)] mr-2 flex-shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
