import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Twitter } from "lucide-react";
import type { TeamMember } from '@shared/schema';

export default function Team() {
  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members'],
  });

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Talented professionals passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-8 border animate-pulse">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex space-x-2 justify-center">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--emerald-light)] group">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    >
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full border-4 border-[var(--emerald-light)]"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-full flex items-center justify-center border-4 border-[var(--emerald-light)]">
                          <span className="text-white font-bold text-2xl">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-[var(--emerald)] font-semibold">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                    
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {member.social && Object.keys(member.social).length > 0 && (
                      <div className="flex justify-center space-x-3">
                        {member.social.github && (
                          <a
                            href={`https://github.com/${member.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${member.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={`https://twitter.com/${member.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[var(--emerald)] transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-light)] rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Growing Our Team
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              We're building an amazing team of talented individuals. Stay tuned to meet our crew!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}