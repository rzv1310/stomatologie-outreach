import { useEffect, useRef } from 'react';
import dinteContur from '@/assets/dinte-contur.jpg';

interface ToothLogoProps {
  size?: number;
  color?: string;
}

export const ToothLogo = ({ size = 24, color = '#ffffff' }: ToothLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      // Parse color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
      };
      const rgb = hexToRgb(color);

      // Identify outline pixels (dark pixels)
      const isOutline = new Uint8Array(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (brightness <= 80) {
          isOutline[i / 4] = 1;
        }
      }

      // Dilate the outline to make it thicker
      const dilationRadius = 3;
      const dilated = new Uint8Array(width * height);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          if (isOutline[idx]) {
            for (let dy = -dilationRadius; dy <= dilationRadius; dy++) {
              for (let dx = -dilationRadius; dx <= dilationRadius; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  if (dx * dx + dy * dy <= dilationRadius * dilationRadius) {
                    dilated[ny * width + nx] = 1;
                  }
                }
              }
            }
          }
        }
      }

      // Apply dilated outline with specified color
      for (let i = 0; i < dilated.length; i++) {
        const pixelIdx = i * 4;
        if (dilated[i]) {
          data[pixelIdx] = rgb.r;
          data[pixelIdx + 1] = rgb.g;
          data[pixelIdx + 2] = rgb.b;
          data[pixelIdx + 3] = 255;
        } else {
          data[pixelIdx + 3] = 0;
        }
      }

      offCtx.putImageData(imageData, 0, 0);

      // Draw processed image to visible canvas
      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(offCanvas, 0, 0, size, size);
    };

    if (img.complete) {
      processImage();
    } else {
      img.onload = processImage;
    }
  }, [size, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="block"
      style={{ width: size, height: size }}
    />
  );
};
