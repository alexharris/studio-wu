"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Header() {
  const pathname = usePathname();
  const excludedPaths = ["/"];
  // Check if pathname matches excluded paths or starts with /studio
  const shouldExclude = excludedPaths.includes(pathname) || pathname.startsWith('/studio');

  
  if (shouldExclude) return null;
  return (
    <header className="flex justify-between items-center p-8 pb-0 pt-12 mb-12">
      <Image
        src="/StudioWu_Logo_Black_1000px.png"
        alt="Studio Wu Logo"
        width={250}
        height={0}
      />
      <nav className="">
        <ul className="flex gap-4 text-black justify-between w-full angie uppercase">
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Press</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
