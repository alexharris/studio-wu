import Image from "next/image";

export default function Home() {
  return (
    <>
      <img
        src="/homepage-bg.jpg"
        alt="Homepage background"
        className="homepage-bg"
      />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          footer
        </footer>
      </div>
    </>
  );
}
