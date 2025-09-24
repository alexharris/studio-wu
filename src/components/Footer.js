"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import { getSettingsQuery } from "../utils/sanity-queries";

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState(null);
  
  const excludedPaths = ["/"];
  // Check if pathname matches excluded paths or starts with /studio
  const shouldExclude = excludedPaths.includes(pathname) || pathname.startsWith('/studio');
  
  useEffect(() => {
    async function fetchSettings() {
      try {
        const settingsData = await client.fetch(getSettingsQuery);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    }
    
    if (!shouldExclude) {
      fetchSettings();
    }
  }, [shouldExclude]);
  
  if (shouldExclude) return null;
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-green text-white angie p-8 mt-12">
      <div className="flex-1">
        <p>
          {settings?.emailAddress || ''}<br />
          {settings?.phoneNumber || ''} <br />
          <span className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1665 1.6665H5.83317C3.53198 1.6665 1.6665 3.53198 1.6665 5.83317V14.1665C1.6665 16.4677 3.53198 18.3332 5.83317 18.3332H14.1665C16.4677 18.3332 18.3332 16.4677 18.3332 14.1665V5.83317C18.3332 3.53198 16.4677 1.6665 14.1665 1.6665Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.3333 9.47476C13.4361 10.1683 13.3176 10.8766 12.9947 11.4989C12.6718 12.1213 12.1609 12.6259 11.5346 12.9412C10.9083 13.2564 10.1986 13.3661 9.50641 13.2547C8.81419 13.1433 8.17472 12.8165 7.67895 12.3207C7.18318 11.825 6.85636 11.1855 6.74497 10.4933C6.63359 9.80106 6.74331 9.09134 7.05852 8.46507C7.37374 7.83881 7.87841 7.32788 8.50074 7.00496C9.12307 6.68205 9.83138 6.56359 10.5249 6.66643C11.2324 6.77133 11.8873 7.10098 12.393 7.60669C12.8987 8.11239 13.2283 8.76733 13.3333 9.47476Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5835 5.4165H14.5918" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <a href="https://www.instagram.com/studiowuinteriors/" target="_blank" rel="noopener noreferrer">@studiowuinteriors</a>
          </span>

        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src="/StudioWu_Seal_White_1000px.png"
          alt="Studio Wu Logo"
          width={60}
          height={0}
        />
      </div>
      <div className="hidden sm:block flex-1 text-right">
        <p>SF Bay Area</p>
      </div>
    </footer>
  );
}
