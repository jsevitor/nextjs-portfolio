import type { Metadata } from "next";
import { Lexend, Red_Hat_Display, Red_Hat_Text } from "next/font/google";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const redhatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const redhatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vitor Oliveira | Portfólio",
  description:
    "Portfólio de Vitor Oliveira, desenvolvedor frontend especializado em React, Next.js, JavaScript e interfaces modernas com foco em performance e usabilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${lexend.className} ${redhatDisplay.className} ${redhatText.className} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
