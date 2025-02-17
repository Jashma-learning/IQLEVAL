import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Symbol {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  type: "book" | "bulb" | "atom";
  velocity: { x: number; y: number; rotation: number };
}

const LearningAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const symbols = useRef<Symbol[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const initSymbols = () => {
    const newSymbols: Symbol[] = [];
    for (let i = 0; i < 15; i++) {
      newSymbols.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 600,
        rotation: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.5,
        type: ["book", "bulb", "atom"][
          Math.floor(Math.random() * 3)
        ] as Symbol["type"],
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          rotation: (Math.random() - 0.5) * 0.02,
        },
      });
    }
    symbols.current = newSymbols;
  };

  const drawBook = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number,
    rotation: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.moveTo(-15, -20);
    ctx.lineTo(15, -20);
    ctx.lineTo(15, 20);
    ctx.lineTo(-15, 20);
    ctx.closePath();
    ctx.moveTo(-12, -17);
    ctx.lineTo(12, -17);
    ctx.stroke();

    ctx.restore();
  };

  const drawBulb = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number,
    rotation: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.moveTo(0, 15);
    ctx.lineTo(0, 20);
    ctx.stroke();

    ctx.restore();
  };

  const drawAtom = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale: number,
    rotation: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 8, Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  };

  const updateAndDraw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
    ctx.lineWidth = 2;

    symbols.current.forEach((symbol) => {
      // Update position
      symbol.x += symbol.velocity.x;
      symbol.y += symbol.velocity.y;
      symbol.rotation += symbol.velocity.rotation;

      // Bounce off edges
      if (symbol.x < 0 || symbol.x > ctx.canvas.width) symbol.velocity.x *= -1;
      if (symbol.y < 0 || symbol.y > ctx.canvas.height) symbol.velocity.y *= -1;

      // Mouse interaction
      const dx = mousePos.current.x - symbol.x;
      const dy = mousePos.current.y - symbol.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const opacity = Math.max(0.2, 1 - distance / 200);
      ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;

      // Draw symbol
      switch (symbol.type) {
        case "book":
          drawBook(ctx, symbol.x, symbol.y, symbol.scale, symbol.rotation);
          break;
        case "bulb":
          drawBulb(ctx, symbol.x, symbol.y, symbol.scale, symbol.rotation);
          break;
        case "atom":
          drawAtom(ctx, symbol.x, symbol.y, symbol.scale, symbol.rotation);
          break;
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    initSymbols();

    let animationFrameId: number;

    const animate = () => {
      updateAndDraw(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] pointer-events-auto"
      />
    </motion.div>
  );
};

export default LearningAnimation;
