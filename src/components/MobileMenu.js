"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();
  // Preload the mobile menu image when component mounts
  useEffect(() => {
    const preloadImage = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = '/StudioWu_Monogram_White_100px.png';
      document.head.appendChild(link);
    };

    preloadImage();
  }, []); // Empty dependency array means this runs once when component mounts

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bg-green inset-0 text-white text-center z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Close button */}
        <div className="flex justify-end p-4 md:p-8">
          <button
            onClick={onClose}
            className="text-2xl"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-8 flex-1 flex items-center justify-center">
          <ul className="flex flex-col items-center angie uppercase text-3xl gap-8">
            <li>
              <a 
                href="/projects" 
                className={`block py-2 ${pathname.startsWith('/projects') ? 'active' : ''}`}
                onClick={onClose}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={`block py-2 ${pathname === '/about' ? 'active' : ''}`}
                onClick={onClose}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/press" 
                className={`block py-2 ${pathname === '/press' ? 'active' : ''}`}
                onClick={onClose}
              >
                Press
              </a>
            </li>            
            <li>
              <a 
                href="/contact" 
                className={`block py-2 ${pathname === '/contact' ? 'active' : ''}`}
                onClick={onClose}
              >
                Contact
              </a>
            </li>

            <li>
              <a 
                href="https://www.instagram.com/studiowuinteriors/" 
                className=" py-2 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </li>            
          </ul>         
        </nav>

        {/* Monogram at bottom */}
        <div className="p-8 pb-12 h-36">
          <Image
            src="/StudioWu_Monogram_White_100px.png"
            alt="Studio Wu Monogram"
            width={60}
            height={0}
            className="mx-auto"
          />          
        </div>
      </div>
  );
}