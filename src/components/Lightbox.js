"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Start downloading an image so it is in the browser cache before it is shown
const preload = (src) => {
  if (src) new window.Image().src = src;
};

// Hidden until loaded so the browser's alt text / broken-image icon never flashes
function Slide({ slide }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={slide.src}
      alt={slide.alt}
      onLoad={() => setLoaded(true)}
      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

// Fullscreen, one-image-per-slide lightbox. Any <img data-lightbox="full-size-url">
// inside the provider opens it on click; slides are those images in page order.
export default function Lightbox({ children }) {
  const containerRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(null);
  const open = index !== null;
  const count = slides.length;

  const openAt = useCallback((target) => {
    const images = [...containerRef.current.querySelectorAll("img[data-lightbox]")];
    if (images.length === 0) return;
    setSlides(images.map((img) => ({ src: img.dataset.lightbox, alt: img.alt })));
    setIndex(Math.max(0, images.indexOf(target)));
  }, []);

  const onContainerHover = (event) => {
    preload(event.target.closest?.("img[data-lightbox]")?.dataset.lightbox);
  };

  const onContainerClick = (event) => {
    const img = event.target.closest?.("img[data-lightbox]");
    if (img) openAt(img);
  };

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i + count - 1) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, prev, next]);

  // Warm the cache for the neighbouring slides
  useEffect(() => {
    if (!open) return;
    preload(slides[(index + 1) % count]?.src);
    preload(slides[(index + count - 1) % count]?.src);
  }, [open, index, slides, count]);

  const controlClass = "absolute z-10 p-3 text-2xl leading-none hover:opacity-60 transition-opacity";

  return (
    <>
      <div ref={containerRef} onClick={onContainerClick} onMouseOver={onContainerHover}>
        {children}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project images"
          className="fixed inset-0 z-50 bg-white"
        >
          <button type="button" onClick={close} aria-label="Close" className={`${controlClass} top-3 right-3 md:top-5 md:right-5`}>
            ✕
          </button>

          {count > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Previous image" className={`${controlClass} left-1 md:left-4 top-1/2 -translate-y-1/2`}>
                ←
              </button>
              <button type="button" onClick={next} aria-label="Next image" className={`${controlClass} right-1 md:right-4 top-1/2 -translate-y-1/2`}>
                →
              </button>
            </>
          )}

          <div className="absolute inset-x-12 inset-y-16 md:inset-x-24">
            <Slide key={index} slide={slides[index]} />
          </div>
        </div>
      )}
    </>
  );
}
