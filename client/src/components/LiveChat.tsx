import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageCircle, X, Send, Minimize2, Maximize2, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you with any questions about our web development services. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message.trim()),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Our pricing varies based on project complexity. Full-stack development starts at $2,999, VPS hosting starts at $29/month, and SEO optimization starts at $499/month. Would you like to discuss your specific needs?";
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return "We offer three main services: Full-Stack Web Development (React, Node.js, databases), VPS Hosting (cloud infrastructure, SSL, backups), and SEO Optimization (search rankings, analytics). Which service interests you most?";
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return "Project timelines typically range from 4-8 weeks for most websites, depending on complexity and features. We'll provide a detailed timeline during our initial consultation. Would you like to schedule a call?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
      return "Great! You can reach us at hello@znforge.dev or +1 (555) 123-4567. You can also fill out our contact form for a detailed project discussion. What's the best way to contact you?";
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples')) {
      return "You can check out our portfolio page to see our latest projects! We've worked on e-commerce platforms, SaaS applications, and custom web solutions. Is there a particular type of project you're interested in?";
    }
    
    if (lowerMessage.includes('team') || lowerMessage.includes('who are you')) {
      return "We're a passionate team of full-stack developers, designers, and DevOps engineers with 5+ years of experience. Our team specializes in modern technologies like React, Node.js, and cloud infrastructure. Would you like to know more about our expertise?";
    }
    
    return "Thank you for your message! For detailed information about your specific needs, I'd recommend filling out our contact form or calling us at +1 (555) 123-4567. Our team will get back to you within 24 hours. Is there anything specific about our services you'd like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-80 sm:w-96 h-96 flex flex-col shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              {/* Chat Header */}
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">ZnForge Support</h3>
                    <p className="text-xs opacity-90">Usually replies instantly</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Content */}
              <AnimatePresence mode="wait">
                {!isMinimized && (
                  <motion.div
                    className="flex flex-col flex-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64">
                      <div className="space-y-3">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                msg.sender === 'user'
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                {msg.sender === 'bot' && (
                                  <Bot className="h-3 w-3 mt-1 flex-shrink-0 opacity-60" />
                                )}
                                {msg.sender === 'user' && (
                                  <User className="h-3 w-3 mt-1 flex-shrink-0 opacity-60" />
                                )}
                                <p className="leading-relaxed">{msg.text}</p>
                              </div>
                              <p className={`text-xs mt-1 ${
                                msg.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex space-x-2">
                        <Input
                          ref={inputRef}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className="flex-1 text-sm"
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!message.trim()}
                          size="sm"
                          className="px-3"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        Press Enter to send • We typically respond within minutes
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}