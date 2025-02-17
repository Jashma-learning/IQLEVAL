import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  connections: number[];
}

const NeuralAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  const initNodes = () => {
    const newNodes: Node[] = [];
    for (let i = 0; i < 30; i++) {
      newNodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 600,
        connections: [],
      });
    }

    // Create connections
    newNodes.forEach((node, i) => {
      for (let j = 0; j < 2; j++) {
        const connectionIndex = Math.floor(Math.random() * newNodes.length);
        if (
          !node.connections.includes(connectionIndex) &&
          connectionIndex !== i
        ) {
          node.connections.push(connectionIndex);
        }
      }
    });

    nodes.current = newNodes;
  };

  const drawNetwork = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw connections
    nodes.current.forEach((node, i) => {
      node.connections.forEach((connectionIndex) => {
        const connectedNode = nodes.current[connectionIndex];
        const dx = connectedNode.x - node.x;
        const dy = connectedNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate proximity to mouse
        const mouseDistance = Math.sqrt(
          Math.pow(mousePos.current.x - node.x, 2) +
            Math.pow(mousePos.current.y - node.y, 2),
        );

        const opacity = Math.max(0.1, 1 - mouseDistance / 200);

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(connectedNode.x, connectedNode.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });

    // Draw nodes
    nodes.current.forEach((node) => {
      const mouseDistance = Math.sqrt(
        Math.pow(mousePos.current.x - node.x, 2) +
          Math.pow(mousePos.current.y - node.y, 2),
      );

      const radius = Math.max(2, 6 - mouseDistance / 50);
      const opacity = Math.max(0.2, 1 - mouseDistance / 200);

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
      ctx.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = 600;

    initNodes();

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      drawNetwork(ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Cleanup
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

export default NeuralAnimation;
