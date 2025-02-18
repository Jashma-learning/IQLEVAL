import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
import AnalysisPreview from "./AnalysisPreview";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (email: string) => {
    setIsLoading(true);
    setUserEmail(email);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowPreview(true);
  };

  const handleFullAnalysis = () => {
    console.log("Requesting full analysis for:", userEmail);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center px-4 py-12"
          >
            <AnalysisPreview
              url={userEmail}
              onFullAnalysis={handleFullAnalysis}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FeatureGrid />
    </div>
  );
};

export default Home;
