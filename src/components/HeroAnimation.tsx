import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  connections: number[];
}

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const hue = useRef(0);

  const colors = [
    "rgba(99, 102, 241, ", // Indigo
    "rgba(168, 85, 247, ", // Purple
    "rgba(236, 72, 153, ", // Pink
  ];

  const initParticles = React.useCallback(() => {
    const newParticles: Particle[] = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 600,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[colorIndex],
        opacity: Math.random() * 0.5 + 0.3,
        connections: [],
      });
    }

    // Create connections
    newParticles.forEach((particle, i) => {
      for (let j = 0; j < 3; j++) {
        const connectionIndex = Math.floor(Math.random() * newParticles.length);
        if (
          !particle.connections.includes(connectionIndex) &&
          connectionIndex !== i
        ) {
          particle.connections.push(connectionIndex);
        }
      }
    });

    particles.current = newParticles;
  }, [colors]);

  const drawParticles = React.useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Update hue
    hue.current = (hue.current + 0.5) % 360;

    // Draw connections first
    particles.current.forEach((particle, i) => {
      particle.connections.forEach((connectionIndex) => {
        const connectedParticle = particles.current[connectionIndex];
        const dx = connectedParticle.x - particle.x;
        const dy = connectedParticle.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connectedParticle.x, connectedParticle.y);
          ctx.strokeStyle = `${particle.color}${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    // Draw and update particles
    particles.current.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x < 0 || particle.x > ctx.canvas.width)
        particle.speedX *= -1;
      if (particle.y < 0 || particle.y > ctx.canvas.height)
        particle.speedY *= -1;

      // Mouse interaction
      const dx = mousePos.current.x - particle.x;
      const dy = mousePos.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        particle.speedX -= Math.cos(angle) * force * 0.2;
        particle.speedY -= Math.sin(angle) * force * 0.2;
      }

      // Add glow effect
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2,
      );
      gradient.addColorStop(0, `${particle.color}${particle.opacity})`);
      gradient.addColorStop(1, `${particle.color}0)`);

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    // Add central glow effect
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      300,
    );
    gradient.addColorStop(0, `hsla(${hue.current}, 100%, 60%, 0.1)`);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    initParticles();

    let animationFrameId: number;

    const animate = () => {
      drawParticles(ctx);
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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles, drawParticles]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] pointer-events-auto"
      />
    </motion.div>
  );
};

export default HeroAnimation;
