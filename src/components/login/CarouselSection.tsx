import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import post1 from "@public/assets/post-1.png";
import post2 from "@public/assets/post-2.png";
import post3 from "@public/assets/post-3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const total = slides.length;

  // Modal entry animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
    );

    slideRefs.current.forEach((slide, i) => {
      gsap.killTweensOf(slideRefs.current);
      gsap.set(slide, { opacity: i === 0 ? 1 : 0, x: 0 });
    });
  }, []);

  // Slide animation
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (index === current) {
        // ENTERING slide (NO blur)
        gsap.fromTo(
          slide,
          {
            opacity: 0,
            x: direction === "next" ? 300 : -300,
            scale: 0.8,
            filter: "blur(0px)", // 👈 keep sharp while entering
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            zIndex: 2,
          },
        );
      } else {
        // EXITING slide (blur + scale down)
        gsap.to(slide, {
          opacity: 0,
          x: direction === "next" ? -300 : 300,
          scale: 0.4,
          filter: "blur(8px)", // 👈 blur only on exit
          duration: 1,
          ease: "power3.inOut",
          zIndex: 1,
        });
      }
    });
  }, [current, direction]);

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setDirection("prev");
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection("next");
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-[500px] md:h-[700px] rounded-2xl overflow-hidden"
      >
        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              if (el) {
                slideRefs.current[i] = el;
              }
            }}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
          >
            <img
              ref={(el) => {
                if (el) {
                  imageRefs.current[i] = el;
                }
              }}
              src={slide.embed}
              alt={`post-${slide.id}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}

        {/* Prev Button */}
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 
             bg-white/80 text-black w-10 h-10 rounded-full 
             flex items-center justify-center shadow-lg 
             transition hover:bg-gray-100 hover:scale-110 
             z-20  cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 
             bg-white/80 text-black w-10 h-10 rounded-full 
             flex items-center justify-center shadow-lg 
             transition hover:bg-gray-100 hover:scale-110 
             z-20 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
