"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { IconArrowLeft, IconArrowRight } from "@/src/components/auth/icons";

const slides = [
  {
    title: ["Fresh Products Delivered", "to your Door"],
    subtitle: "Get 20% off your first order",
  },
  {
    title: ["Farm-Fresh Vegetables", "Picked Every Morning"],
    subtitle: "Free delivery on orders over 500 EGP",
  },
  {
    title: ["Organic Fruits", "at the Best Prices"],
    subtitle: "Save up to 40% on selected items",
  },
];

export default function HeroSlider() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <Image
              src="/hero-grocery.png"
              alt="Fresh groceries"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* Green overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00c950]/90 to-[#05df72]/50" />

            <div className="relative flex h-full items-center px-14 sm:px-20 lg:px-24 xl:px-[120px]">
              <div className="flex max-w-[860px] flex-col items-start gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-9 text-white">
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </h2>
                <p className="text-base text-white">{slide.subtitle}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/products"
                    className="rounded-lg border-2 border-white/50 bg-white px-6 py-2.5 text-base font-semibold text-[#00c950]"
                  >
                    Shop Now
                  </Link>
                  {/* TODO: link to the deals page */}
                  <a
                    href="#"
                    className="rounded-lg border-2 border-white/50 px-6 py-2.5 text-base font-semibold text-white"
                  >
                    View Deals
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button suppressHydrationWarning
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => swiper?.slideToLoop(index)}
            className={`h-3 rounded-full transition-all ${
              activeIndex === index ? "w-8 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Prev/next arrows */}
      <button suppressHydrationWarning
        type="button"
        aria-label="Previous slide"
        onClick={() => swiper?.slidePrev()}
        className="absolute left-2 sm:left-4 top-1/2 z-10 flex h-9 w-9 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg"
      >
        <IconArrowLeft className="h-4.5 w-4.5 text-[#1e2939]" />
      </button>
      <button suppressHydrationWarning
        type="button"
        aria-label="Next slide"
        onClick={() => swiper?.slideNext()}
        className="absolute right-2 sm:right-4 top-1/2 z-10 flex h-9 w-9 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg"
      >
        <IconArrowRight className="h-4.5 w-4.5 text-[#1e2939]" />
      </button>
    </div>
  );
}
