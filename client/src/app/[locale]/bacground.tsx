"use client";
import { motion, AnimatePresence } from "framer-motion";

const Background = () => {
  return (
    <AnimatePresence>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80"></div>

      {/* Main large gradient blobs with higher opacity */}
      <motion.div
        className="absolute -right-1/4 top-0 w-[90%] h-[70%] bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/30%)_0%,transparent_70%)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.7, 0.9, 0.7],
          scale: [0.9, 1.1, 0.9],
          x: [50, 0, 50],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15, // Faster animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -left-1/4 top-1/4 w-[80%] h-[70%] bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/25%)_0%,transparent_70%)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
          scale: [0.8, 1.05, 0.8],
          x: [-20, 20, -20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute right-1/4 bottom-0 w-[70%] h-[60%] bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/28%)_0%,transparent_70%)]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [0.7, 1, 0.7],
          x: [10, -10, 10],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Vibrant colored circles */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-[80px]"
        style={{ top: "10%", right: "30%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-secondary/20 blur-[70px]"
        style={{ bottom: "20%", left: "25%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.7, 1.1, 0.7],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      />

      {/* Moving polygons with thicker strokes and higher opacity */}
      <motion.div
        className="absolute left-[20%] top-[20%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        <motion.svg
          width="450"
          height="450"
          viewBox="0 0 100 100"
          className="text-primary/30 dark:text-primary/20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <motion.polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute right-[15%] bottom-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
      >
        <motion.svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          className="text-secondary/35 dark:text-secondary/25"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <motion.polygon
            points="50,15 75,25 95,50 75,75 50,85 25,75 5,50 25,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ opacity: 0.5, scale: 0.7 }}
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.7, 1, 0.7] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Prominent grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] opacity-70"></div>

      {/* Glowing highlights */}
      <motion.div
        className="absolute top-0 left-[10%] w-1 h-[70vh] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          height: ["0vh", "70vh", "0vh"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-[30%] w-1 h-[60vh] bg-gradient-to-t from-secondary/40 via-secondary/20 to-transparent"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          height: ["0vh", "60vh", "0vh"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[40%] w-[80vw] h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          width: ["0vw", "80vw", "0vw"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      />

      {/* Larger particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/25 dark:bg-primary/15"
          style={{
            width: Math.random() * 20 + 10, // Larger particles
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            opacity: 0,
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: [0, 0.8, 0], // Higher opacity
            y: [0, -100, 0], // More movement
            x: [0, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default Background;
