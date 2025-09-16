"use client";
import Image from "next/image";


export default function Header() {
  return (
    <header className="flex justify-between items-center p-8 pb-0 pt-12">
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
