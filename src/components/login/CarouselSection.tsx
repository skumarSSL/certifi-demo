import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import post1 from "@public/assets/post-1.png";
import post2 from "@public/assets/post-2.png";
import post3 from "@public/assets/post-3.png";

const slides = [
  { id: 1, embed: post2.src },
  { id: 2, embed: post3.src },
  { id: 3, embed: post2.src },
  { id: 4, embed: post3.src },
];

function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // 🔹 Modal entry animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.85, y: 80 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
    );

    slideRefs.current.forEach((slide, i) => {
      gsap.set(slide, { opacity: i === 0 ? 1 : 0 });
      gsap.set(imageRefs.current[i], { y: 0, scale: 1.05 });
    });
  }, []);

  // 🔹 Slide + Parallax animation
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (index === current) {
        gsap.fromTo(
          slide,
          {
            opacity: 0,
            y: 80,
            scale: 0.2,
          },
          {
            opacity: 1,
            y: 0,
            scale: 0.9,
            duration: 4,
            ease: "power2.inOut",
            zIndex: 2,
          },
        );
      } else {
        gsap.to(slide, {
          opacity: 0,
          y: -40,
          scale: 0.9,
          duration: 2,
          ease: "power2.inOut",
          zIndex: 1,
        });
      }
    });
  }, [current]);

  // 🔹 Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 8000);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-[500px] md:h-[700px] rounded-2xl overflow-hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              if (el) slideRefs.current[i] = el;
            }}
            className="absolute inset-0 opacity-0 flex items-center justify-center"
          >
            <img
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              src={slide.embed}
              alt={`post-${slide.id}`}
              className="w-full h-full object-contain rounded-lg will-change-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
