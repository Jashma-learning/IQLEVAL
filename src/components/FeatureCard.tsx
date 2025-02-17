import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "../lib/utils";
import { Zap, Brain, Search } from "lucide-react";

interface FeatureCardProps {
  title?: string;
  description?: string;
  icon?: typeof Zap;
  className?: string;
}

const FeatureCard = ({
  title = "Personalized Learning",
  description = "AI-powered personalized learning paths adapted to your unique learning style and pace.",
  icon: Icon = Zap,
  className,
}: FeatureCardProps) => {
  return (
    <Card
      className={cn(
        "bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform perspective-1000 hover:rotate-y-12",
        className,
      )}
    >
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 p-2.5 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="mt-4 text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const defaultFeatures = [
  {
    title: "Personalized Learning",
    description:
      "AI-powered learning paths tailored to your unique learning style and pace.",
    icon: Brain,
  },
  {
    title: "Adaptive Assessments",
    description:
      "Smart assessments that adjust to your knowledge level and provide instant feedback.",
    icon: Zap,
  },
  {
    title: "Progress Tracking",
    description:
      "Detailed analytics and insights to track your learning progress and achievements.",
    icon: Search,
  },
];

export default FeatureCard;
