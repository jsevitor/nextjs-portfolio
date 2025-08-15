"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonTalkToMe } from "../common/Buttons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  const menu = [
    { label: "Home", href: "/#home" },
    { label: "Sobre", href: "/#about" },
    { label: "Projetos", href: "/#projects" },
    { label: "Contato", href: "/#contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      menu.forEach((item) => {
        const el = document.querySelector(item.href.replace("/#", "#"));
        if (el instanceof HTMLElement) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (
            window.scrollY >= top - 100 &&
            window.scrollY < top + height - 100
          ) {
            setActiveSection(item.href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // para já marcar ao carregar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (href: string, idx: number) => {
    const isActive = activeSection === href;
    const isFirst = idx === 0;
    const isLast = idx === menu.length - 1;

    let base = "py-2 pl-2 transition-colors";
    if (isFirst) base += " rounded-l-full";
    if (isLast) base += " rounded-r-full";
    if (isActive) {
      base += " bg-accent-green font-medium";
    } else {
      base += " hover:bg-accent-green";
    }
    return base;
  };

  const handleClick = (href: string) => {
    const el = document.querySelector(href.replace("/#", "#"));
    if (el instanceof HTMLElement) {
      window.scrollTo({
        top: el.offsetTop - 50,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="border-b border-gray py-2 fixed top-0 left-0 right-0 bg-background z-50">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
        <Link href="/">
          <h1 className="text-4xl lg:text-5xl font-bold">vitor</h1>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex gap-12 items-center">
          <ul className="flex border border-dark rounded-full">
            {menu.map((item, idx) => (
              <li key={item.href} className={linkClasses(item.href, idx)}>
                <button onClick={() => handleClick(item.href)} className="px-8">
                  {item.label}
                </button>
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
              <button
                onClick={() => handleClick(item.href)}
                className="w-full text-left"
              >
                <div className="flex items-center gap-8 border-b">
                  <span className="text-6xl font-extrabold">0{idx + 1}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
