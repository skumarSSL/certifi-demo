"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import draft from "@public/assets/draft.svg";
import certifLogo from "@public/assets/certifi.svg";
import newMailbox from "@public/assets/new-mailbox.svg";

export default function SecureLoader() {
  const circleRef = useRef<SVGCircleElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const frame1Ref = useRef<HTMLParagraphElement>(null);
  const frame2Ref = useRef<HTMLParagraphElement>(null);
  const frame3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const frames = [frame1Ref.current, frame2Ref.current, frame3Ref.current];

    gsap.set(frames, { opacity: 0, scale: 0.6, filter: "blur(4px)" });

    // 🔁 Rotate dashed circle continuously
    gsap.to(circleRef.current, {
      rotation: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "linear",
      duration: 10,
    });

    // 🔁 Animate dash movement (gives signal flow feel)
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: 0 },
      {
        strokeDashoffset: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
      },
    );

    const gifTl = gsap.timeline({ repeat: -1 });

    frames.forEach((frame) => {
      gifTl
        .to(frame, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        })
        .to(frame, {
          opacity: 0,
          scale: 0.6,
          filter: "blur(4px)",
          duration: 0.6,
          delay: 0.6,
          ease: "power3.in",
        });
    });
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Glass background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/50"></div>

      {/* Loader content */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-50 h-50">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#0E6DBD"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            {/* Frame 1 */}
            <div ref={frame1Ref} className="absolute">
              <img src={draft.src} className="w-23 h-21" />
            </div>

            {/* Frame 2 */}
            <div ref={frame2Ref} className="absolute">
              <img src={newMailbox.src} className="w-23 h-21" />
            </div>

            {/* Frame 3 */}
            <div ref={frame3Ref} className="absolute relative">
              <img src={newMailbox.src} className="w-23 h-21" />
              <img
                src={certifLogo.src}
                className="absolute top-3 left-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
