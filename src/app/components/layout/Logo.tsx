import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo({ ...props }) {
  const [logoSrc, setLogoSrc] = useState("/logo-white.svg");

  const updateLogo = () => {
    const theme = localStorage.getItem("theme") || "dark";
    const logo = theme === "light" ? "/logo-black.svg" : "/logo-white.svg";
    setLogoSrc(logo);
  };

  useEffect(() => {
    updateLogo();

    window.addEventListener("themeChange", updateLogo);

    window.addEventListener("storage", updateLogo);

    return () => {
      window.removeEventListener("themeChange", updateLogo);
      window.removeEventListener("storage", updateLogo);
    };
  }, []);

  return <Image src={logoSrc} alt="Logo" width={40} height={40} {...props} />;
}
