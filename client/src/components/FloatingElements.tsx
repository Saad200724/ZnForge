import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Large floating cube */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-[var(--emerald)] opacity-20 cube-3d"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating diamond */}
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-[var(--emerald-light)] opacity-30 transform rotate-45"
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

      {/* Floating circle */}
      <motion.div
        className="absolute bottom-32 left-32 w-20 h-20 bg-white opacity-10 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Wireframe square */}
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 border-2 border-[var(--emerald)] opacity-40 transform rotate-45"
        animate={{
          rotate: [45, 405],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Large wireframe cube - bottom right */}
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 border border-[var(--emerald)] opacity-10"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Middle floating hexagon */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--emerald-dark)] opacity-20"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{
          rotate: [0, 360],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
