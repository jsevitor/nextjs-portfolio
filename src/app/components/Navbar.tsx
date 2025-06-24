import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-medium py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Image src="/logo-white.svg" alt="Logo" width={40} height={40} />
        </div>
        <nav className="flex gap-12">
          <ul className="flex gap-12">
            {["Home", "Sobre", "Projetos", "Contato"].map((item, idx) => (
              <li key={idx} className="group relative">
                <Link href="#" className="text-white">
                  {item}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <button className="cursor-pointer">
              <i className="bi bi-sun-fill"></i>
              <i className="bi bi-moon-fill"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
