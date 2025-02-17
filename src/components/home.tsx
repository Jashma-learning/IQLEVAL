import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
import AnalysisPreview from "./AnalysisPreview";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisUrl, setAnalysisUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleAnalyze = (url: string) => {
    setIsAnalyzing(true);
    setAnalysisUrl(url);

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowPreview(true);
    }, 2000);
  };

  const handleFullAnalysis = () => {
    console.log("Requesting full analysis for:", analysisUrl);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <HeroSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center px-4 py-12"
          >
            <AnalysisPreview
              url={analysisUrl}
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
