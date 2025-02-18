import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Zap, Users, LineChart } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="w-full py-20 px-4 relative overflow-hidden bg-black/20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About IQLEVAL</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing education through advanced cognitive assessment and
            personalized AI learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  At IQLEVAL, we're committed to transforming education by
                  understanding each student's unique cognitive profile. Our
                  AI-powered platform creates personalized learning experiences
                  that adapt to individual thinking patterns and learning
                  styles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Who We Serve
                </h3>
                <p className="text-muted-foreground">
                  We support students, educators, and institutions by providing
                  deep insights into cognitive abilities and learning
                  preferences. Our platform helps identify strengths and areas
                  for growth, enabling more effective educational strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Our Approach
                </h3>
                <p className="text-muted-foreground">
                  Through advanced AI algorithms and cognitive science, we
                  evaluate learning patterns and create tailored educational
                  pathways. This data-driven approach ensures each student
                  receives the most effective learning experience possible.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop"
                alt="AI Learning Platform"
                className="object-cover h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
