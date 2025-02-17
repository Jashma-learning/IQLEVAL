import React from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { ArrowRight, Gauge, Brain, Zap } from "lucide-react";

interface MetricProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const Metric = ({ label, value, icon }: MetricProps) => (
  <div className="flex items-center gap-4">
    <div className="h-10 w-10 rounded-lg bg-primary/10 p-2.5 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <Progress value={value} className="w-24" />
        <span className="text-sm font-medium">{value}%</span>
      </div>
    </div>
  </div>
);

interface AnalysisPreviewProps {
  url?: string;
  metrics?: Array<{
    label: string;
    value: number;
    icon: React.ReactNode;
  }>;
  onFullAnalysis?: () => void;
}

const AnalysisPreview = ({
  url = "example.com",
  metrics = [
    {
      label: "Course Progress",
      value: 0,
      icon: <Gauge className="text-primary h-5 w-5" />,
    },
    {
      label: "Knowledge Level",
      value: 0,
      icon: <Brain className="text-primary h-5 w-5" />,
    },
    {
      label: "Learning Speed",
      value: 0,
      icon: <Zap className="text-primary h-5 w-5" />,
    },
  ],
  onFullAnalysis = () => console.log("Full analysis requested"),
}: AnalysisPreviewProps) => {
  return (
    <Card className="w-full max-w-[800px] bg-black/40 backdrop-blur-xl border border-white/10 transform perspective-1000 hover:rotate-y-6 transition-all duration-500">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Learning Journey</h3>
          <p className="text-sm text-muted-foreground">
            Personalized plan for: {url}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {metrics.map((metric, index) => (
            <Metric key={index} {...metric} />
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={onFullAnalysis} className="flex items-center gap-2">
            View Full Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisPreview;
