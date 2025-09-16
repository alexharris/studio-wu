import Image from "next/image";



export default function Home() {
  return (
    <>
      <img
        src="/homepage-bg.jpg"
        alt="Homepage background"
        className="homepage-bg"
      />
      <div className="homepage  flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-16 row-start-2 items-center">
          <Image
            src="/StudioWu_Logo_White_1000px.png"
            alt="Studio Wu Logo"
            width={500}
            height={0}
          />
          <nav className="w-full">
            <ul className="flex gap-4 text-white text-lg justify-between w-full angie uppercase">
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
        </main>
            {/* Footer removed from homepage, now handled in layout.js */}
      </div>
    </>
  );
}
