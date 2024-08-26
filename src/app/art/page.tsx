"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useWindowSize } from "react-use"

import { ART_PORTFOLIO } from "@/lib/constants.ts"
import { useStore } from "@/lib/store.ts"
import Artwork, { ArtworkZoomInfo } from "@/ui/artwork.tsx"
import { randomElement } from "@/lib/functions.ts"

interface ClickToZoomState {
  src: string
  color: string
}

const ZOOM_INFO_CLASSES = ["text-primary", "text-secondary", "text-tertiary", "text-quaternary"]

function makeClickToZoomState(): ClickToZoomState {
  const color = randomElement(ZOOM_INFO_CLASSES)
  const src = randomElement(ART_PORTFOLIO).src
  return { src, color }
}

export default function ArtPage() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const store = useStore()
  const size = useWindowSize()
  const isMobile = size.width < 640
  const style = { marginTop: store.headerHeight + (isMobile ? 16 : 64) }
  const [clickToZoom, setClickToZoom] = useState(() => makeClickToZoomState())

  useEffect(() => {
    const int = setInterval(
      () => {
        setClickToZoom(makeClickToZoomState())
      },
      Math.PI * 1000 * (2 / 3),
    )

    return () => clearInterval(int)
  })

  return (
    <div className="art-page">
      <h3 className="text-2xl">artwork here:</h3>

      <div style={style} className="js-artwork-container fixed inset-0 m-4 sm:m-16">
        <AnimatePresence>
          {activeSrc && (
            <motion.div
              className="art-page_backdrop fixed inset-0 z-10 bg-black bg-opacity-85"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSrc(null)}
            />
          )}
        </AnimatePresence>

        {ART_PORTFOLIO.map((img) => {
          const active = activeSrc === img.src
          const hasClickToZoom = clickToZoom.src === img.src
          return (
            <Artwork
              src={img.src}
              key={img.src}
              active={activeSrc === img.src}
              onClick={() => {
                setActiveSrc(active ? null : img.src)
              }}
            >
              <ArtworkZoomInfo
                className={!active && hasClickToZoom ? clickToZoom.color : "hidden"}
              />
            </Artwork>
          )
        })}
      </div>
    </div>
  )
}
