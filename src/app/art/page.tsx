"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import Artwork from "@/ui/artwork";
import { IMG_LIST } from "@/lib/constants.ts";

export default function ArtPage() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const bgClick = (e: MouseEvent) => {
      setActive(null);
    };
    document.addEventListener("click", bgClick);
    return () => document.removeEventListener("click", bgClick);
  }, []);

  return (
    <div>
      <h3 className="text-2xl">artwork here:</h3>

      <div
        className={clsx(
          "art-page__backdrop pointer-events-none fixed inset-0 z-10 bg-black transition-all duration-1000",
          active ? "bg-opacity-85" : "bg-opacity-0",
        )}
      />

      <div className="js-artwork-container fixed inset-0 z-10">
        {IMG_LIST.map((src) => (
          <Artwork
            src={src}
            key={src}
            active={active === src}
            onClick={() => {
              setActive(src === active ? null : src);
            }}
          />
        ))}
      </div>
    </div>
  );
}
