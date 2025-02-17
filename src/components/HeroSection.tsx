import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Brain } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import LearningAnimation from "./LearningAnimation";

interface HeroSectionProps {
  onAnalyze?: (url: string) => void;
  isAnalyzing?: boolean;
}

const HeroSection = ({
  onAnalyze = () => {},
  isAnalyzing = false,
}: HeroSectionProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <div className="relative min-h-[600px] w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-background to-background px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <LearningAnimation />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Animated AI Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 1,
              rotate: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="mb-8"
          >
            <div className="rounded-full bg-primary/10 p-6">
              <Brain className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            AI-Powered Learning Platform
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12 max-w-2xl text-lg text-muted-foreground"
          >
            Experience personalized learning powered by AI. Get customized study
            plans, adaptive assessments, and real-time feedback to accelerate
            your growth.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <WaitlistForm className="flex justify-center" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
