import { motion } from "framer-motion";
import { Trophy, Rocket, Handshake } from "lucide-react";

const values = [
  {
    icon: Trophy,
    title: "Excellence in Every Project",
    description: "Delivering high-quality solutions that exceed expectations",
    delay: 0
  },
  {
    icon: Rocket,
    title: "Innovation-Driven Approach",
    description: "Leveraging cutting-edge technologies for competitive advantage",
    delay: 0.2
  },
  {
    icon: Handshake,
    title: "Long-term Partnerships",
    description: "Building lasting relationships with our clients",
    delay: 0.4
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[var(--charcoal)] relative overflow-hidden">
      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-32 left-32 w-48 h-48 border-2 border-[var(--emerald)] opacity-5 transform rotate-45"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-36 h-36 bg-[var(--emerald-light)] opacity-5 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[var(--emerald)] mb-6">About ZnForge</h2>
            <p className="text-xl text-gray-300 mb-8">
              We are a team of passionate developers, designers, and digital strategists committed to delivering exceptional web solutions that drive business growth.
            </p>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: value.delay }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-12 h-12 bg-[var(--emerald)] rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    <value.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern tech consultancy team collaborating" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-24 h-24 bg-[var(--emerald)] rounded-full opacity-80"
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
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-[var(--emerald-light)] rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
