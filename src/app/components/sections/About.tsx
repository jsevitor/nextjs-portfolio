"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AboutSkeleton,
  StacksSkeleton,
} from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { ButtonPrimary } from "../common/Buttons";

interface About {
  id: string;
  card1: string;
  card2: string;
  card3: string;
  card4: string;
  card5: string;
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
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-2xl"
              >
                {/* Card 1 */}
                <div className="flex flex-col gap-4 ">
                  <p className="border border-gray h-fit p-4 rounded-2xl">
                    {item.card1}
                  </p>
                  <div className="hidden lg:flex justify-center items-center h-full">
                    <Image
                      src={"/assets/dev.png"}
                      alt="Ilustração de desenvolvedor"
                      width={300}
                      height={400}
                      className="w-60 object-cover object-top"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col-reverse lg:flex-col justify-between gap-8 p-4 shadow rounded-2xl bg-background">
                  <div className="flex flex-col gap-2 text-sm ">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl">100% </span>
                      <p>{item.card2}</p>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold text-xl">
                        +{totalProjects}
                      </span>
                      <p>{item.card3}</p>
                    </div>
                  </div>
                  <Image
                    src={item.image}
                    alt="Foto de perfil"
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover object-top mx-auto border border-gray rounded-2xl shadow"
                  />
                </div>

                {/* Card 3 */}
                <div className="flex flex-col-reverse lg:flex-col justify-between gap-8 lg:gap-4">
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
                  <div className="flex flex-col gap-8 border border-gray rounded-2xl p-4">
                    <div className="flex gap-4">
                      <span className="flex items-center justify-center pt-0.5 h-8 w-8 bg-dark-gray rounded-full lg:text-xl text-background shrink-0">
                        <i className="bi bi-stars"></i>
                      </span>
                      <p>{item.card4}</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center justify-center pt-0.5 h-8 w-8 bg-dark-gray rounded-full lg:text-xl text-background shrink-0">
                        <i className="bi bi-stars"></i>
                      </span>
                      <p>{item.card5}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="felx flex-col items-center justify-center text-dark my-8">
            <h3 className="text-xl text-center font-extrabold mb-4">
              HABILIDADES TÉCNICAS
            </h3>
            {loading ? (
              <StacksSkeleton />
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-4 text-sm   border-t border-b border-gray py-4 lg:px-8">
                {stacks.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray shadow"
                  >
                    <i className={`${item.icon} text-4xl lg:text-6xl`}></i>
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
