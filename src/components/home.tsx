import React, { useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "./HeroSection";
import UseCases from "./UseCases";
import AboutUs from "./AboutUs";
import FeatureGrid from "./FeatureGrid";
import Footer from "./Footer";
import { useToast } from "./ui/use-toast";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (email: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Successfully Joined Waitlist!",
      description:
        "Thank you for your interest! We'll notify you as soon as we launch.",
      duration: 5000,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>IQLEVAL - AI-Powered Cognitive Learning Platform</title>
        <meta
          name="description"
          content="Experience personalized learning powered by AI. Get customized study plans, adaptive assessments, and real-time feedback based on your cognitive profile."
        />
        <meta
          name="keywords"
          content="AI learning, cognitive assessment, personalized education, adaptive learning"
        />
        <meta
          property="og:title"
          content="IQLEVAL - AI-Powered Cognitive Learning Platform"
        />
        <meta
          property="og:description"
          content="Experience personalized learning powered by AI. Get customized study plans, adaptive assessments, and real-time feedback based on your cognitive profile."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://iqleval.com" />
      </Helmet>
      <main className="min-h-screen w-full bg-background">
        <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />
        <UseCases />
        <FeatureGrid />
        <AboutUs />
        <Footer />
      </main>
    </>
  );
};

export default Home;
