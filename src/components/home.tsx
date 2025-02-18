import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
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
    <div className="min-h-screen w-full bg-background">
      <HeroSection onSubmit={handleSubmit} isLoading={isLoading} />
      <FeatureGrid />
    </div>
  );
};

export default Home;
