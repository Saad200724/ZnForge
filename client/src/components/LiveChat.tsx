import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, User, Headphones } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: ""
  });

  const startChat = () => {
    if (!userInfo.name || !userInfo.email) return;
    
    setIsStarted(true);
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Hi ${userInfo.name}! Thanks for reaching out. How can we help you today?`,
      sender: 'support',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");
    
    setTimeout(() => {
      const autoResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! One of our team members will respond shortly. In the meantime, feel free to browse our services or contact us directly at hello@znforge.com",
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isStarted) {
        sendMessage();
      } else {
        startChat();
      }
    }
  };

  return (
    <>
      {/* Chat Button with Enhanced Animations */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Animated Ring */}
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full border-4 border-[var(--emerald)] opacity-30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary Ring */}
        <motion.div
          className="absolute inset-1 w-18 h-18 rounded-full border-2 border-[var(--emerald-light)] opacity-20"
          animate={{
            scale: [1.2, 1.6, 1.2],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotateY: [0, 10, 0],
            rotateX: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.2,
            rotateZ: 15,
            transition: { duration: 0.3 }
          }}
          whileTap={{
            scale: 0.9,
            rotateZ: -10,
          }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--emerald)] to-[var(--emerald-dark)] hover:from-[var(--emerald-dark)] hover:to-[var(--emerald)] text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu"
            size="icon"
          >
            <motion.div
              animate={{
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MessageCircle className="h-8 w-8" />
            </motion.div>
          </Button>
        </motion.div>
        
        {/* Enhanced Notification dot */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.4,
            rotate: 180,
          }}
        >
          !
        </motion.div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute -top-4 -left-4 w-2 h-2 bg-[var(--emerald)] rounded-full opacity-60"
          animate={{
            scale: [0, 1, 0],
            y: [0, -20, -40],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1,
          }}
        />
        
        <motion.div
          className="absolute -bottom-4 -right-4 w-3 h-3 bg-[var(--emerald-light)] rounded-full opacity-40"
          animate={{
            scale: [0, 1, 0],
            x: [0, 15, 30],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)]"
            initial={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.8,
              rotateY: -15,
              rotateX: 10 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateY: 0,
              rotateX: 0 
            }}
            exit={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.8,
              rotateY: 15,
              rotateX: -10 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-[var(--emerald)]/20 rounded-xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="relative"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card className="h-full glass-effect bg-[var(--charcoal)]/95 border-[var(--emerald)]/30 shadow-2xl backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-[var(--emerald)]/20 relative overflow-hidden">
                  {/* Animated header background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--emerald)]/10 to-transparent"
                    animate={{
                      x: [-100, 400],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <CardTitle className="text-lg font-semibold text-[var(--emerald)] flex items-center relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotateY: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Headphones className="h-5 w-5 mr-2" />
                    </motion.div>
                    <motion.span
                      animate={{
                        color: ['var(--emerald)', 'var(--emerald-light)', 'var(--emerald)'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Live Chat
                    </motion.span>
                  </CardTitle>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsOpen(false);
                        setIsStarted(false);
                        setMessages([]);
                        setUserInfo({ name: "", email: "" });
                      }}
                      className="text-gray-400 hover:text-white h-8 w-8 relative z-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </CardHeader>
                
                <CardContent className="p-0 h-[calc(100%-4rem)] flex flex-col">
                  {!isStarted ? (
                    // Chat Start Form
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-center">
                      <motion.div 
                        className="text-center mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-16 h-16 bg-[var(--emerald)] rounded-full flex items-center justify-center mx-auto mb-3"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotateY: [0, 360, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <User className="h-8 w-8 text-white" />
                        </motion.div>
                        <h3 className="text-white font-semibold text-lg">Start a conversation</h3>
                        <p className="text-gray-400 text-sm">We're here to help with your project needs</p>
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Input
                          placeholder="Your name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                          onKeyPress={handleKeyPress}
                          className="bg-[var(--charcoal)] border-[var(--emerald)]/30 text-white focus:border-[var(--emerald)]"
                        />
                        <Input
                          placeholder="Your email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                          onKeyPress={handleKeyPress}
                          className="bg-[var(--charcoal)] border-[var(--emerald)]/30 text-white focus:border-[var(--emerald)]"
                        />
                        <Button
                          onClick={startChat}
                          disabled={!userInfo.name || !userInfo.email}
                          className="w-full bg-[var(--emerald)] hover:bg-[var(--emerald-dark)] text-white"
                        >
                          Start Chat
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    // Chat Interface
                    <>
                      {/* Messages */}
                      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                        <AnimatePresence>
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <motion.div
                                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                  message.sender === 'user'
                                    ? 'bg-gradient-to-r from-[var(--emerald)] to-[var(--emerald-dark)] text-white rounded-br-none'
                                    : 'bg-gray-700 text-gray-100 rounded-bl-none'
                                }`}
                                whileHover={{ scale: 1.02 }}
                              >
                                {message.text}
                                <div className="text-xs mt-1 opacity-70">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      
                      {/* Message Input */}
                      <div className="p-4 border-t border-[var(--emerald)]/20">
                        <div className="flex space-x-2">
                          <Textarea
                            placeholder="Type your message..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 bg-[var(--charcoal)] border-[var(--emerald)]/30 text-white focus:border-[var(--emerald)] min-h-[40px] max-h-[80px] resize-none"
                          />
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={sendMessage}
                              disabled={!currentMessage.trim()}
                              className="bg-[var(--emerald)] hover:bg-[var(--emerald-dark)] text-white px-3"
                            >
                              <motion.div
                                animate={{
                                  rotate: currentMessage.trim() ? [0, 10, -10, 0] : 0,
                                }}
                                transition={{
                                  duration: 0.5,
                                  ease: "easeInOut",
                                }}
                              >
                                <Send className="h-4 w-4" />
                              </motion.div>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}