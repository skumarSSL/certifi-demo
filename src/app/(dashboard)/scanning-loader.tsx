"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  isVisible: boolean;
  isScanningComplete: boolean;
  isScannedError: boolean;
  onComplete?: () => void;
}

const ScanningLoader: React.FC<LoaderProps> = ({
  isVisible,
  isScanningComplete,
  isScannedError,
  onComplete,
}) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<SVGRectElement>(null);
  const docRef = useRef<SVGSVGElement>(null);

  // Success Refs
  const checkRef = useRef<SVGSVGElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);

  // Error Refs
  const errorRef = useRef<SVGSVGElement>(null);
  const errorPath1Ref = useRef<SVGPathElement>(null);
  const errorPath2Ref = useRef<SVGPathElement>(null);

  const linesRef = useRef<(SVGRectElement | null)[]>([]);
  const scanTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setStatus("loading");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );

      scanTl.current = gsap.timeline({ repeat: -1 });
      scanTl.current
        .fromTo(
          linesRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.inOut",
          },
        )
        .to(linesRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });

      gsap.to(scannerRef.current, {
        y: 30,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [isVisible]);

  // Logic to switch between Success and Error
  useEffect(() => {
    if (isVisible && status === "loading") {
      if (isScannedError) {
        showErrorState();
      } else if (isScanningComplete) {
        showSuccessState();
      }
    }
  }, [isScanningComplete, isScannedError, isVisible]);

  const transitionOutDoc = () => {
    if (scanTl.current) scanTl.current.pause();
    return gsap.to([docRef.current, scannerRef.current], {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      ease: "back.in(1.7)",
    });
  };

  const showSuccessState = () => {
    setStatus("success");
    const tl = gsap.timeline({ onComplete: () => onComplete?.() });
    tl.add(transitionOutDoc())
      .fromTo(
        checkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      )
      .fromTo(
        checkPathRef.current,
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6 },
        "-=0.3",
      );
  };

  const showErrorState = () => {
    setStatus("error");
    const tl = gsap.timeline({ onComplete: () => onComplete?.() });
    tl.add(transitionOutDoc())
      .fromTo(
        errorRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      )
      .fromTo(
        [errorPath1Ref.current, errorPath2Ref.current],
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 0.4,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.2",
      );
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-md"
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center p-10 rounded-3xl bg-white shadow-2xl border border-slate-100 min-w-[280px]"
      >
        <div className="relative w-33 h-33 mb-6 flex items-center justify-center">
          {/* DOCUMENT LOADER */}
          <svg
            ref={docRef}
            viewBox="0 0 80 100"
            className="absolute inset-0 w-full h-full"
          >
            <path
              d="M15 5H55L75 25V95H15V5Z"
              className="fill-white stroke-slate-200"
              strokeWidth="2"
            />
            {[40, 52, 64].map((y, i) => (
              <rect
                key={y}
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                x="25"
                y={y}
                width={i === 2 ? "20" : "35"}
                height="4"
                rx="2"
                className="fill-sky-500"
              />
            ))}
            <rect
              ref={scannerRef}
              x="10"
              y="40"
              width="60"
              height="2"
              rx="1"
              className="fill-sky-400"
              style={{ filter: "drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))" }}
            />
          </svg>

          {/* SUCCESS CHECK */}
          <svg
            ref={checkRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-0"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              className="fill-green-50 stroke-green-500"
              strokeWidth="2"
            />
            <path
              ref={checkPathRef}
              d="M30 52L44 66L72 38"
              fill="none"
              className="stroke-green-500"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ERROR CROSS */}
          <svg
            ref={errorRef}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-0"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              className="fill-red-50 stroke-red-500"
              strokeWidth="2"
            />
            <path
              ref={errorPath1Ref}
              d="M35 35L65 65"
              fill="none"
              className="stroke-red-500"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              ref={errorPath2Ref}
              d="M65 35L35 65"
              fill="none"
              className="stroke-red-500"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h3
          className={`text-lg font-bold transition-all duration-500 ${status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-slate-700"}`}
        >
          {status === "loading"
            ? "Scanning Document..."
            : status === "success"
              ? "Clean File"
              : "Threat Detected"}
        </h3>

        <p className="text-slate-400 text-sm mt-1 text-center">
          {status === "success" && "No virus detected"}
          {status === "error" && "Virus detected in file"}
          {status === "loading" && "Processing secure trail"}
        </p>
      </div>
    </div>
  );
};

export default ScanningLoader;
