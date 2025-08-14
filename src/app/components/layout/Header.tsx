"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../common/ThemeToggle";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { it } from "node:test";
import { ButtonTalkToMe } from "../common/Buttons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menu = [
    { label: "Home", href: "/#home" },
    { label: "Sobre", href: "/#about" },
    { label: "Projetos", href: "/#projects" },
    { label: "Contato", href: "/#contacts" },
  ];

  const linkClasses = (href: string, idx: number) => {
    const isActive = pathname === href;
    const isFirst = idx === 0;
    const isLast = idx === menu.length - 1;

    let base = "py-2 pl-2 transition-colors";

    if (isFirst) base += " rounded-l-full";
    if (isLast) base += " rounded-r-full";

    if (isActive) {
      base += " bg-accent-green";
    } else {
      base += " hover:bg-accent-green";
    }

    return base;
  };

  return (
    <header className="border-b border-gray py-2 fixed top-0 left-0 right-0 bg-background z-50 font-redhat-display">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
        <Link href="/">
          <h1 className="text-4xl lg:text-5xl font-bold">vitor</h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex gap-12 items-center ">
          <ul className="flex border border-dark rounded-full">
            {menu.map((item, idx) => (
              <li key={item.href} className={`${linkClasses(item.href, idx)}`}>
                <Link href={item.href} className="px-8 py-8">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonTalkToMe className="hidden lg:block" />

        {/* Botão hamburguer */}
        <button
          className="lg:hidden text-3xl z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <i className="bi bi-x-lg" /> : <i className="bi bi-list" />}
        </button>
      </div>

      {/* Menu Mobile */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-background transition-transform duration-300 z-40 flex flex-col justify-center gap-8 p-8 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-8 text-foreground text-4xl">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-8 border-b">
                  <span className="text-6xl font-extrabold">0{idx + 1}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
