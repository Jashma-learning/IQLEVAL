import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <motion.form
      name="waitlist"
      method="POST"
      data-netlify="true"
      className={`w-full max-w-md mx-auto px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Required for Netlify Forms */}
      <input type="hidden" name="form-name" value="waitlist" />

      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 bg-white/5 w-full text-white placeholder:text-gray-400 border border-white/10"
          autoComplete="email"
          spellCheck="false"
        />
        <Button 
          type="submit" 
          size="lg" 
          className="h-12 w-full sm:w-auto bg-primary hover:bg-primary-600 text-white whitespace-nowrap" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
