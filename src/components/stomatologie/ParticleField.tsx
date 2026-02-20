import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dinteContur from '@/assets/dinte-contur.jpg';

interface Tooth {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseSpeedX: number;
  baseSpeedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const teethRef = useRef<Tooth[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load and process tooth image to remove white background
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = dinteContur;
    
    const processImage = () => {
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx || !img.complete) return;
      
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      offCtx.drawImage(img, 0, 0);
      
      const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imageData.data;
      const width = offCanvas.width;
      const height = offCanvas.height;
      
      // First pass: identify outline pixels
      const isOutline = new Uint8Array(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness <= 80) {
          isOutline[i / 4] = 1;
        }
      }
      
      // Second pass: dilate the outline (make it thicker)
      const dilationRadius = 2;
      const dilated = new Uint8Array(width * height);
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          if (isOutline[idx]) {
            // Expand to neighboring pixels
            for (let dy = -dilationRadius; dy <= dilationRadius; dy++) {
              for (let dx = -dilationRadius; dx <= dilationRadius; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  // Circular dilation
                  if (dx * dx + dy * dy <= dilationRadius * dilationRadius) {
                    dilated[ny * width + nx] = 1;
                  }
                }
              }
            }
          }
        }
      }
      
      // Apply dilated outline with emerald color (#2D5A5A)
      for (let i = 0; i < dilated.length; i++) {
        const pixelIdx = i * 4;
        if (dilated[i]) {
          data[pixelIdx] = 45;      // R: 0x2D = 45
          data[pixelIdx + 1] = 90;  // G: 0x5A = 90
          data[pixelIdx + 2] = 90;  // B: 0x5A = 90
          data[pixelIdx + 3] = 255;
        } else {
          data[pixelIdx + 3] = 0;
        }
      }
      
      offCtx.putImageData(imageData, 0, 0);
      
      const processedImg = new Image();
      processedImg.src = offCanvas.toDataURL();
      imageRef.current = processedImg;
    };
    
    img.onload = () => {
      processImage();
      animate();
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize teeth - free movement across entire hero
    const toothCount = 20;
    
    teethRef.current = Array.from({ length: toothCount }, (_, index) => {
      const size = Math.random() * 15 + 45; // 45-60px
      
      // Parallax: smaller teeth move faster, larger ones slower
      const normalizedSize = Math.min(size, 50);
      const speedFactor = 1 - (normalizedSize - 15) / 35;
      const baseSpeedX = (Math.random() - 0.5) * (0.5 + speedFactor * 1.0);
      const baseSpeedY = (Math.random() - 0.5) * (0.5 + speedFactor * 1.0);
      
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: baseSpeedX,
        speedY: baseSpeedY,
        baseSpeedX,
        baseSpeedY,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015 * (size > 60 ? 0.3 : 1),
        opacity: size > 60 ? 0.85 : 0.9 + (1 - speedFactor) * 0.1,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      timeRef.current += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = imageRef.current;
      if (!img || !img.complete) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Collision detection and repulsion between teeth
      const teeth = teethRef.current;
      for (let i = 0; i < teeth.length; i++) {
        for (let j = i + 1; j < teeth.length; j++) {
          const t1 = teeth[i];
          const t2 = teeth[j];
          
          const dx = t2.x - t1.x;
          const dy = t2.y - t1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = (t1.size + t2.size) / 2 * 0.8; // Collision radius
          
          if (distance < minDist && distance > 0) {
            // Calculate repulsion force
            const overlap = minDist - distance;
            const force = overlap * 0.15;
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Apply repulsion (smaller teeth move more)
            const totalSize = t1.size + t2.size;
            const ratio1 = t2.size / totalSize;
            const ratio2 = t1.size / totalSize;
            
            t1.x -= nx * force * ratio1;
            t1.y -= ny * force * ratio1;
            t2.x += nx * force * ratio2;
            t2.y += ny * force * ratio2;
          }
        }
      }

      teethRef.current.forEach((tooth, index) => {
        // Add continuous random wandering motion
        const wanderX = Math.sin(timeRef.current * 0.5 + index * 1.7) * 0.2;
        const wanderY = Math.cos(timeRef.current * 0.4 + index * 2.3) * 0.2;
        
        tooth.speedX = tooth.baseSpeedX + wanderX;
        tooth.speedY = tooth.baseSpeedY + wanderY;
        
        // Update position
        tooth.x += tooth.speedX;
        tooth.y += tooth.speedY;
        tooth.rotation += tooth.rotationSpeed;

        // Mouse interaction - gentle push
        const dx = mouseRef.current.x - tooth.x;
        const dy = mouseRef.current.y - tooth.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150;
          tooth.x -= (dx / distance) * force * 3;
          tooth.y -= (dy / distance) * force * 3;
        }

        // Wrap around screen edges
        if (tooth.x < -tooth.size) tooth.x = canvas.width + tooth.size;
        if (tooth.x > canvas.width + tooth.size) tooth.x = -tooth.size;
        if (tooth.y < -tooth.size) tooth.y = canvas.height + tooth.size;
        if (tooth.y > canvas.height + tooth.size) tooth.y = -tooth.size;

        // Draw tooth image with emerald glow effect
        ctx.save();
        ctx.translate(tooth.x, tooth.y);
        ctx.rotate(tooth.rotation);
        
        ctx.globalAlpha = tooth.opacity;
        
        // Add emerald glow effect
        ctx.shadowColor = 'rgba(45, 90, 90, 0.6)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        const imgSize = tooth.size;
        ctx.drawImage(img, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation if image is cached
    if (img.complete) {
      processImage();
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};