"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AboutSkeleton,
  StacksSkeleton,
} from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { ButtonPrimary } from "../common/Buttons";
import { url } from "inspector";

interface About {
  id: string;
  location: string;
  content: string;
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
                <div className="flex flex-col gap-4 justify-between ">
                  <p className="border border-gray h-fit p-4 rounded-2xl">
                    Sou um desenvolvedor frontend apaixonado por transformar
                    ideias em interfaces funcionais e bonitas. Minha missão é
                    unir design e tecnologia para criar experiências digitais
                    fluidas, responsivas e acessíveis. Sempre aberto a novos
                    desafios e pronto para colaborar em projetos que façam a
                    diferença.
                  </p>
                </div>
                <div className="flex flex-col-reverse lg:flex-col justify-between gap-4 p-4 shadow rounded-2xl bg-background">
                  <div className="flex items-center justify-center h-12 w-12 bg-accent-green text-foreground rounded-full lg:text-3xl border border-foreground shrink-0">
                    <i className="bi bi-globe-americas-fill"></i>
                  </div>
                  <p className="">
                    <span className="font-bold text-2xl">100% </span> Dedicação
                    para entregar interfaces limpas, responsivas e intuitivas
                  </p>
                  <Image
                    src={item.image}
                    alt="Foto de perfil"
                    width={300}
                    height={400}
                    className="w-full h-72 object-cover object-top mx-auto border border-gray rounded-2xl shadow"
                  />
                </div>
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
                      <p>
                        Com experiência em HTML, CSS, JavaScript, React e
                        Next.js, foco na criação de soluções web responsivas e
                        otimizadas, aplicando boas práticas de UI/UX e
                        metodologias ágeis.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="flex items-center justify-center pt-0.5 h-8 w-8 bg-dark-gray rounded-full lg:text-xl text-background shrink-0">
                        <i className="bi bi-stars"></i>
                      </span>
                      <p>
                        Estou sempre estudando novas tecnologias e tendências do
                        desenvolvimento web, buscando evolução constante para
                        oferecer resultados cada vez melhores.
                      </p>
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
