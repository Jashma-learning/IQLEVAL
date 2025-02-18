import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Brain, Target, Route, Sparkles } from "lucide-react";

interface UseCaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const UseCase = ({ icon, title, description }: UseCaseProps) => (
  <Card className="bg-black/40 backdrop-blur-xl border border-white/10 transform hover:scale-105 transition-all duration-300">
    <CardContent className="p-6">
      <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const useCases = [
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "Cognitive Assessment",
    description:
      "Advanced AI evaluation of your learning style, strengths, and cognitive patterns.",
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Learning Style Analysis",
    description:
      "Identify your unique learning preferences and optimal study methods.",
  },
  {
    icon: <Route className="h-6 w-6 text-primary" />,
    title: "Personalized Pathways",
    description:
      "Custom learning paths designed around your cognitive profile and goals.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "Adaptive Learning",
    description:
      "Dynamic content that evolves with your progress and cognitive development.",
  },
];

const UseCases = () => {
  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Your Cognitive Learning Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience a revolutionary approach to learning, tailored to your
            unique cognitive profile
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {useCases.map((useCase, index) => (
            <UseCase key={index} {...useCase} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
