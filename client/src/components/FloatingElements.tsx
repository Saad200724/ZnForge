import { motion } from 'framer-motion';

export default function FloatingElements() {
  return (
    <>
      {/* Medium floating elements */}
      <motion.div
        className="fixed top-32 right-16 w-6 h-6 bg-[var(--emerald)] opacity-20 rounded-full z-0"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="fixed bottom-40 left-20 w-8 h-8 border border-[var(--emerald-light)] opacity-30 transform rotate-45 z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [45, 135, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="fixed top-64 left-1/4 w-4 h-4 bg-[var(--emerald-light)] opacity-25 z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="fixed bottom-64 right-1/3 w-3 h-3 bg-white opacity-15 rounded-full z-0"
        animate={{
          y: [0, -20, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  );
}