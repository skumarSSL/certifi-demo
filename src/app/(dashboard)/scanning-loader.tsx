"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { File } from "lucide-react";

export default function RadarLoader() {
  const radarGroupRef = useRef<SVGGElement>(null);
  const scanRef = useRef<SVGRectElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Radar sweep
    gsap.to(radarGroupRef.current, {
      rotation: 360,
      transformOrigin: "100px 100px",
      duration: 4,
      ease: "linear",
      repeat: -1,
    });

    // Scan line animation
    gsap.fromTo(
      scanRef.current,
      { y: 40 },
      {
        y: 160,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    // Paper pulse
    gsap.to(paperRef.current, {
      scale: 1.05,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background blur */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/40"></div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          
          {/* radar rings */}
          <circle cx="100" cy="100" r="80" stroke="#0E6DBD" strokeWidth="2" fill="none" opacity="0.3" />
          <circle cx="100" cy="100" r="55" stroke="#0E6DBD" strokeWidth="1.5" fill="none" opacity="0.3" />
          <circle cx="100" cy="100" r="30" stroke="#0E6DBD" strokeWidth="1" fill="none" opacity="0.3" />

          {/* Radar sweep */}
          <g ref={radarGroupRef}>
            <path
              d="M100 100 L100 20 A80 80 0 0 1 180 100 Z"
              fill="url(#radarGradient)"
              opacity="0.6"
            />
          </g>

          {/* Clip area for scan */}
          <defs>
            <clipPath id="radarClip">
              <circle cx="100" cy="100" r="80" />
            </clipPath>

            <linearGradient id="scanGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0E6DBD" stopOpacity="0" />
              <stop offset="50%" stopColor="#0E6DBD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0E6DBD" stopOpacity="0" />
            </linearGradient>

            {/* <radialGradient id="radarGradient">
              <stop offset="0%" stopColor="#0E6DBD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0E6DBD" stopOpacity="0" />
            </radialGradient> */}
          </defs>

          {/* Scanning line */}
          <g clipPath="url(#radarClip)">
            <rect
              ref={scanRef}
              x="20"
              width="160"
              height="25"
              fill="url(#scanGradient)"
              opacity="0.8"
            />
          </g>
        </svg>

        {/* Paper icon */}
        <div
          ref={paperRef}
          className="absolute flex items-center justify-center"
        >
          <File className="w-20 h-20 text-gray-500 opacity-90" />
        </div>
      </div>
    </div>
  );
}