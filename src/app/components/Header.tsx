"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { label: "Home", href: "/#home" },
    { label: "Sobre", href: "/#about" },
    { label: "Projetos", href: "/#projects" },
    { label: "Contato", href: "/#contacts" },
  ];

  return (
    <header className="border-b border-gray-medium py-4 fixed top-0 left-0 right-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
        <Link href="/">
          <Logo />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-12 items-center">
          <ul className="flex gap-12">
            {menu.map((item, idx) => (
              <li key={idx} className="group relative">
                <Link href={item.href} className="text-foreground">
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>

        {/* Botão hamburguer */}
        <button
          className="md:hidden text-foreground text-3xl z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <i className="bi bi-x-lg" /> : <i className="bi bi-list" />}
        </button>
      </div>

      {/* Menu Mobile */}
      <nav
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-background transition-transform duration-300 z-40 flex flex-col items-center justify-center gap-8 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-8 text-foreground text-2xl">
          {menu.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex justify-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
