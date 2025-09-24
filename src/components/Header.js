"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileMenu from "./MobileMenu";


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const excludedPaths = ["/"];
  // Check if pathname matches excluded paths or starts with /studio
  const shouldExclude = excludedPaths.includes(pathname) || pathname.startsWith('/studio');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  
  if (shouldExclude) return null;
  return (
    <>
      <header className="flex justify-between items-center p-4 md:p-8 pb-0 pt-4 md:pt-12 mb-20">
        <a href="/">
          <Image
            src="/StudioWu_Logo_Black_1000px.png"
            alt="Studio Wu Logo"
            width={200}
            height={0}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4 text-black justify-between w-full angie uppercase text-md">
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/press">Press</a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/studiowuinteriors/" 
              >
                <svg alt="Instagram Logo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </li>              
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Toggle mobile menu"
        >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
