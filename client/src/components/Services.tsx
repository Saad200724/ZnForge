import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Search, CheckCircle } from "lucide-react";
import type { Service } from '@shared/schema';

const iconMap = {
  Code: Code,
  Server: Server,
  Search: Search,
};

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive web development solutions designed to accelerate your business growth
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-8 border animate-pulse">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="space-y-2 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--emerald-light)] group">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-6">
                        {service.features?.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="h-5 w-5 text-[var(--emerald)] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      
                      {service.price && (
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-2xl font-bold text-[var(--emerald)]">
                            {service.price}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}