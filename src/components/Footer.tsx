import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-white/10 bg-black/20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">IQLEVAL</h3>
            <p className="text-sm text-muted-foreground">
              Revolutionizing education through cognitive assessment and AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Features</li>
              <li>Use Cases</li>
              <li>About</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@iqleval.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IQLEVAL. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
