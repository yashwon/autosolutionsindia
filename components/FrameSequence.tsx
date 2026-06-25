"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface FrameSequenceProps {
  frameCount: number;
  framePath: string; // e.g., "/frames/frame_"
  padLength: number; // e.g., 4
  extension: string; // e.g., ".webp"
}

export default function FrameSequence({
  frameCount,
  framePath,
  padLength,
  extension,
}: FrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(padLength, "0");
      img.src = `${framePath}${paddedIndex}${extension}`;
      
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        // Initial draw if first frame
        if (i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) drawImage(ctx, img, canvasRef.current);
        }
      };
      
      loadedImages.push(img);
    }
    
    setImages(loadedImages);
  }, [frameCount, framePath, padLength, extension]);

  // Function to draw image covering the canvas (like object-fit: cover)
  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Setup ScrollTrigger and Resize
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // GSAP Scroll animation state
    const frameObj = { frame: 1 };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw current frame
      const currentFrame = Math.round(frameObj.frame);
      if (images[currentFrame - 1]?.complete) {
        drawImage(ctx, images[currentFrame - 1], canvas);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing
    
    const tl = gsap.to(frameObj, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Smooth scrubbing
      },
      onUpdate: () => {
        const currentFrame = Math.round(frameObj.frame);
        if (images[currentFrame - 1]?.complete) {
          requestAnimationFrame(() => {
            drawImage(ctx, images[currentFrame - 1], canvas);
          });
        }
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [images, frameCount]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      
      {/* Optional: Simple loading indicator if frames are still downloading */}
      {loadedCount < Math.min(frameCount, 100) && (
        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm z-50">
          Loading {Math.round((loadedCount / Math.min(frameCount, 100)) * 100)}%
        </div>
      )}
    </div>
  );
}
