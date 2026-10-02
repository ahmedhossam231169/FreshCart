"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full min-w-0 shrink-0 lg:w-[400px] flex-col items-center justify-center">
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="h-[300px] w-full sm:h-[400px] overflow-hidden rounded-xl border border-[#e5e7eb] bg-white"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image + index} className="relative flex h-full w-full items-center justify-center">
            <Image src={image} alt={alt} fill className="object-contain p-6" />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          watchSlidesProgress
          slidesPerView={4}
          spaceBetween={12}
          className="mt-4 flex justify-between gap-2 overflow-hidden ps-6"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={image + index}
              className="!h-16 !w-16 sm:!h-20 sm:!w-20 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 m-auto border-[#e5e7eb] bg-white [&.swiper-slide-thumb-active]:border-[#16a34a]"
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-contain p-1"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
