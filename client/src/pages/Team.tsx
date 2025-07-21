import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import type { TeamMember } from '@shared/schema';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Team() {
  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members'],
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Passionate professionals dedicated to creating exceptional digital experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-8 border animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex space-x-2 justify-center">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {teamMembers.map((member) => (
                <motion.div key={member.id} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader className="pb-4">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                            <span className="text-white font-bold text-2xl">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {member.position}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {member.bio}
                      </p>
                      
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          {member.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      {member.social && Object.keys(member.social).length > 0 && (
                        <div className="flex justify-center space-x-4">
                          {member.social.github && (
                            <a
                              href={`https://github.com/${member.social.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={`https://linkedin.com/in/${member.social.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={`https://twitter.com/${member.social.twitter}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              <Twitter className="h-5 w-5" />
                            </a>
                          )}
                          {member.social.dribbble && (
                            <a
                              href={`https://dribbble.com/${member.social.dribbble}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                              <div className="w-5 h-5 bg-current rounded-full"></div>
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Growing Our Team
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                We're always looking for talented individuals to join our mission. 
                Check back soon to meet our amazing team members!
              </p>
              <Link href="/contact">
                <Button>
                  Interested in Joining Us?
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Believe In
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The values that unite us and drive everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Continuous Learning',
                description: 'We stay ahead of the curve by constantly exploring new technologies and improving our skills.'
              },
              {
                title: 'Client Success',
                description: 'Your success is our success. We measure our achievements by the results we deliver for you.'
              },
              {
                title: 'Quality Code',
                description: 'We write clean, maintainable, and scalable code that stands the test of time.'
              },
              {
                title: 'Creative Problem Solving',
                description: 'Every challenge is an opportunity to innovate and find elegant solutions.'
              },
              {
                title: 'Open Communication',
                description: 'We believe in transparent, honest communication throughout every project.'
              },
              {
                title: 'Work-Life Balance',
                description: 'Happy developers create better products. We support our team\'s well-being.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-8 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              We're always looking for talented developers, designers, and creative problem solvers 
              to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                careers@znforge.dev
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LiveChat />
    </div>
  );
}