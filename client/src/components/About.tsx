import { motion } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About ZnForge
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're a passionate team of developers and designers building the future of web technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between innovative technology and practical business solutions, 
                ZnForge has grown from a small startup to a trusted partner for businesses worldwide.
              </p>
              <p>
                Our journey began when we recognized the need for modern, scalable web solutions that don't just look good, 
                but perform exceptionally and drive real business results. We combine cutting-edge technologies with 
                time-tested development practices to create digital experiences that matter.
              </p>
              <p>
                Today, we're proud to have helped hundreds of businesses transform their digital presence and achieve 
                their growth objectives through our comprehensive web development services.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="text-white text-center z-10">
                <motion.div 
                  className="text-6xl font-bold mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  2019
                </motion.div>
                <div className="text-xl">Founded</div>
              </div>
              <motion.div 
                className="absolute inset-0 bg-white opacity-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--emerald-light)] opacity-20 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--emerald)] opacity-20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: 'Excellence',
              description: 'We strive for perfection in every line of code and every design decision.'
            },
            {
              icon: Users,
              title: 'Collaboration',
              description: 'Working closely with clients to understand their unique needs and goals.'
            },
            {
              icon: Lightbulb,
              title: 'Innovation',
              description: 'Embracing new technologies and creative solutions to solve complex problems.'
            },
            {
              icon: Award,
              title: 'Quality',
              description: 'Delivering robust, scalable solutions that stand the test of time.'
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--emerald-light)] group">
                <CardContent className="pt-8 pb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          className="text-center mt-20 p-12 bg-gradient-to-r from-[var(--emerald)] to-[var(--emerald-light)] rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Our Mission
          </h3>
          <blockquote className="text-xl text-white/90 leading-relaxed mb-6 italic max-w-4xl mx-auto">
            "To empower businesses with innovative web solutions that drive growth, 
            enhance user experiences, and create lasting digital impact."
          </blockquote>
          <p className="text-white/80 leading-relaxed max-w-3xl mx-auto">
            We believe that every business deserves a digital presence that truly represents their vision 
            and helps them achieve their goals. That's why we're committed to delivering not just websites, 
            but complete digital solutions that make a difference.
          </p>
        </motion.div>
      </div>
    </section>
  );
}