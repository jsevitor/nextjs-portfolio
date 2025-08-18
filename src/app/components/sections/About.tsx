"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AboutSkeleton,
  StacksSkeleton,
} from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { ButtonPrimary } from "../common/Buttons";
import Skills from "./Skills";

interface About {
  id: string;
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  card5: string;
  card6: string;
  image: string;
  curriculum: string;
}

interface Stack {
  id: string;
  icon: string;
  name: string;
}

export default function About() {
  const [aboutData, setAboutData] = useState<About[]>([]);
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState<number | null>(null);

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/about`);
      if (!res.ok) throw new Error("Erro ao buscar abouts");
      const data = await res.json();
      setAboutData(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectSummary = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects/summary`);
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      console.log(data.total);
      setTotalProjects(data.total);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const fetchStacks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stacks`);
      if (!res.ok) throw new Error("Erro ao buscar stacks");
      const data = await res.json();
      setStacks(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchStacks();
    fetchProjectSummary();
  }, []);

  function HighlightedText({ text }: { text: string }) {
    const keywords = [
      "Front-End",
      "Back-End",
      "Full Stack",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Análise e Desenvolvimento de Sistemas",
    ];

    return (
      <p>
        {text.split(" ").map((word, i) =>
          keywords.some((k) => k.toLowerCase() === word.toLowerCase()) ? (
            <span key={i} className="font-bold text-dark">
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </p>
    );
  }

  return (
    <section
      className="border border-gray rounded-4xl py-8 shadow bg-[#cacac8]"
      id="about"
    >
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              SOBRE MIM
            </h1>
          </div>
          {loading ? (
            <AboutSkeleton />
          ) : (
            aboutData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1fr] gap-8 rounded-2xl 2xl:text-lg"
              >
                {/* Card 1 - Photo */}
                <div>
                  <Image
                    src={item.image}
                    alt="Foto de perfil"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover object-top mx-auto border border-gray rounded-2xl shadow"
                  />
                </div>

                {/* Card 2 - Profile */}
                <div className="flex flex-col justify-between gap-8 bg-background shadow rounded-2xl p-4 lg:py-4 lg:px-8">
                  <div className="flex flex-col gap-4 font-medium ">
                    <p>{item.card1}</p>
                    <p>{item.card2}</p>
                  </div>

                  <div className="flex flex-col gap-4 lg:pb-4">
                    <div className="flex gap-4">
                      <span className="flex items-center justify-center pt-0.5 h-6 w-6 lg:h-8 lg:w-8 bg-dark-gray rounded-full lg:text-xl text-background shrink-0">
                        <i className="bi bi-stars"></i>
                      </span>
                      <p>{item.card3}</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center justify-center pt-0.5 h-6 w-6 lg:h-8 lg:w-8 bg-dark-gray rounded-full lg:text-xl text-background shrink-0">
                        <i className="bi bi-stars"></i>
                      </span>
                      <p>{item.card4}</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Stats */}
                <div className="flex flex-col-reverse lg:flex-col justify-between gap-8">
                  <div className="grid grid-rows-2 gap-8">
                    <div className="flex flex-col border border-gray shadow rounded-2xl p-4">
                      <span className="font-extrabold text-3xl ">100% </span>
                      <p>{item.card5}</p>
                    </div>

                    <div className="flex flex-col border border-gray shadow rounded-2xl p-4">
                      <span className="font-extrabold text-3xl">
                        +{totalProjects}
                      </span>
                      <p>{item.card6}</p>
                    </div>
                  </div>

                  <div className="flex justify-center items-end lg:items-center lg:h-full">
                    <ButtonPrimary
                      url={item.curriculum}
                      className="shadow flex justify-center"
                    >
                      <span className="flex items-center gap-2">
                        <p className="font-bold">Baixar Currículo</p>
                        <i className="bi bi-arrow-down-circle"></i>
                      </span>
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            ))
          )}
          <Skills />
        </div>
      </div>
    </section>
  );
}
