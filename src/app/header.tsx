"use client"

import clsx from "clsx"
import Link from "next/link.js"
import { usePathname } from "next/navigation.js"
import { useEffect, useRef } from "react"
import { useEvent } from "react-use"

import { classes } from "@/lib/classes.ts"
import { useStore } from "@/lib/store.ts"

const LINKS: React.HTMLProps<HTMLAnchorElement>[] = [
  {
    href: "/",
    children: "lju.me",
  },
  {
    href: "/art",
    children: "art",
  },
  {
    href: "https://github.com/veryeasily",
    target: "_blank",
    children: "code",
  },
  {
    href: "https://soundcloud.com/siiiiinging",
    target: "_blank",
    children: "music",
  },
]

const HEADER_CLASSES = {
  active: "border-b-primary text-primary",
  inactive: "text-primary",
}

function HeaderLink({ children, target, href = "#" }: React.HTMLProps<HTMLAnchorElement>) {
  const isNewTab = target === "_blank"
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        isActive ? HEADER_CLASSES.active : HEADER_CLASSES.inactive,
        "header_link border-2 border-white bg-white px-1 md:px-2 py-1 md:py-0.5 hover:border-teal-500 hover:text-teal-500 active:border-teal-400 active:text-teal-400",
      )}
    >
      <div className="header_inner-link flex items-center gap-1 text-base leading-none underline md:text-2xl">
        <div className="header_link-text">{children}</div>
        {isNewTab && (
          <div className="header_new-tab-link material-symbols--open-in-new relative mt-0.5 text-xs md:mt-1" />
        )}
      </div>
    </Link>
  )
}

const Header = ({ className, ...rest }: React.HTMLProps<HTMLElement>) => {
  const store = useStore()
  const headerRef = useRef<HTMLElement>(null)

  /**
   * Records the header height in the global store
   */
  function recordHeight() {
    const header = headerRef.current
    if (!header) return

    store.setHeaderHeight(header.clientHeight)
  }

  useEffect(recordHeight, [store])
  useEvent("resize", recordHeight)

  return (
    <header
      className={classes("header shadow-2xl shadow-primary z-10", className)}
      ref={headerRef}
      {...rest}
    >
      <div className="header_inner mx-auto flex max-w-screen-sm flex-none justify-center gap-1.5 p-2 md:gap-2.5 md:p-4">
        {LINKS.map((props) => (
          <HeaderLink key={props.href} {...props} />
        ))}
      </div>
    </header>
  )
}

export default Header
