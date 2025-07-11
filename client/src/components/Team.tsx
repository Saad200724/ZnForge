import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Lead Developer",
    description: "Full-stack expert with 8+ years experience",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    delay: 0
  },
  {
    name: "Sarah Johnson",
    role: "UX/UI Designer",
    description: "Creative designer focused on user experience",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    delay: 0.2
  },
  {
    name: "Michael Rodriguez",
    role: "DevOps Engineer",
    description: "Infrastructure and deployment specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    delay: 0.4
  },
  {
    name: "Emily Watson",
    role: "SEO Specialist",
    description: "Digital marketing and SEO strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    delay: 0.6
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-[var(--emerald)] opacity-5 transform rotate-45"
        animate={{
          rotate: [45, 405],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-28 h-28 border-2 border-[var(--emerald)] opacity-5 rounded-full"
        animate={{
          rotateX: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
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
          <h2 className="text-4xl md:text-5xl font-black text-[var(--emerald)] mb-4">Our Team</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the experts behind ZnForge's success - a diverse team of skilled professionals dedicated to your project's success.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: member.delay }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                {/* Animated background ring */}
                <motion.div
                  className="absolute inset-0 bg-[var(--emerald)]/20 rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[var(--emerald)] group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating accent */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--emerald)] rounded-full"
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
              </div>
              
              <motion.h3
                className="text-xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: member.delay + 0.2 }}
                viewport={{ once: true }}
              >
                {member.name}
              </motion.h3>
              
              <motion.p
                className="text-[var(--emerald)] font-semibold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: member.delay + 0.3 }}
                viewport={{ once: true }}
              >
                {member.role}
              </motion.p>
              
              <motion.p
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: member.delay + 0.4 }}
                viewport={{ once: true }}
              >
                {member.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
