import clsx from "clsx";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";

export default function Artwork({ src }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const loaded = dimensions.width > 0 && dimensions.height > 0;

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    rotateDeg: 0,
  });

  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = Math.floor(Math.random() * width) - width / 2;
      const y = Math.floor(Math.random() * height) - height / 2;
      const z = Math.floor(Math.random() * -10);
      setPosition({
        x,
        y,
        z,
        rotateX: Math.random(),
        rotateY: Math.random(),
        rotateZ: Math.random(),
        rotateDeg: Math.floor(Math.random() * 180),
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [loaded]);

  const style = loaded
    ? {
        transform: `
          translate3d(${position.x}px, ${position.y}px, ${position.z}px)
          rotate3d(${position.rotateX}, ${position.rotateY}, ${position.rotateZ}, ${position.rotateDeg}deg)
          scale(0.5)
        `,
      }
    : {};

  const doLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <Image
      src={src}
      alt="artwork"
      className={clsx(["transition", loaded ? "block" : "hidden"])}
      style={style}
      onLoad={doLoad}
    />
  );
}
