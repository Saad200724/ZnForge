import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Lock, Eye, EyeOff, Users, Briefcase, MessageSquare, Settings } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import type { Service, TeamMember, PortfolioProject, ContactSubmission } from '@shared/schema';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  features: z.array(z.string()).default([]),
  price: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.string().optional(),
  skills: z.array(z.string()).default([]),
  social: z.record(z.string()).default({}),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

type ServiceFormData = z.infer<typeof serviceSchema>;
type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
type PortfolioFormData = z.infer<typeof portfolioSchema>;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('services');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: '' },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: { password: string }) => {
      // Simple password check - in production, use proper authentication
      if (data.password === 'znforge2024') {
        return Promise.resolve({ success: true });
      }
      return Promise.reject(new Error('Invalid password'));
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({ title: 'Login successful', description: 'Welcome to the admin panel!' });
    },
    onError: () => {
      toast({
        title: 'Login failed',
        description: 'Invalid password. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Data queries
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    enabled: isAuthenticated,
  });

  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members'],
    enabled: isAuthenticated,
  });

  const { data: portfolioProjects = [], isLoading: portfolioLoading } = useQuery<PortfolioProject[]>({
    queryKey: ['/api/portfolio-projects'],
    enabled: isAuthenticated,
  });

  const { data: contactSubmissions = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact-submissions'],
    enabled: isAuthenticated,
  });

  // Service form
  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: 'Code',
      features: [],
      price: '',
      isActive: true,
      order: 0,
    },
  });

  // Service mutations
  const createServiceMutation = useMutation({
    mutationFn: (data: ServiceFormData) =>
      apiRequest('/api/services', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsDialogOpen(false);
      serviceForm.reset();
      toast({ title: 'Service created successfully!' });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiceFormData }) =>
      apiRequest(`/api/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: 'Service updated successfully!' });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/services/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({ title: 'Service deleted successfully!' });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Enter the admin password to access the panel
            </p>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter admin password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage your website content and settings
              </p>
            </div>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Logout
            </Button>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contacts</span>
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Services</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingItem(null); serviceForm.reset(); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Service' : 'Add New Service'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...serviceForm}>
                    <form
                      onSubmit={serviceForm.handleSubmit((data) => {
                        if (editingItem) {
                          updateServiceMutation.mutate({ id: editingItem.id, data });
                        } else {
                          createServiceMutation.mutate(data);
                        }
                      })}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={serviceForm.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={serviceForm.control}
                          name="icon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Code">Code</SelectItem>
                                  <SelectItem value="Server">Server</SelectItem>
                                  <SelectItem value="Search">Search</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={serviceForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={serviceForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (optional)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Starting at $999" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center space-x-4">
                        <FormField
                          control={serviceForm.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium">Active</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={serviceForm.control}
                          name="order"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Order</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end space-x-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={createServiceMutation.isPending || updateServiceMutation.isPending}
                        >
                          {editingItem ? 'Update' : 'Create'} Service
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {servicesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant={service.isActive ? 'default' : 'secondary'}>
                            {service.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      {service.price && (
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                          {service.price}
                        </p>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem(service);
                            serviceForm.reset({
                              title: service.title,
                              description: service.description,
                              icon: service.icon,
                              features: service.features || [],
                              price: service.price || '',
                              isActive: service.isActive,
                              order: service.order,
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteServiceMutation.mutate(service.id)}
                          disabled={deleteServiceMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tabs would be similar but simplified for now */}
          <TabsContent value="team">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Team management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Portfolio management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Submissions</h2>
              
              {contactsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="pt-6">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : contactSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {contactSubmissions.map((submission) => (
                    <Card key={submission.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{submission.name}</CardTitle>
                          <Badge variant="secondary">{submission.service}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {submission.email} • {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          {submission.message}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">No contact submissions yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}