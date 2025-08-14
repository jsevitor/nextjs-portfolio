"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AboutSkeleton,
  StacksSkeleton,
} from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { ButtonGreen } from "../common/Buttons";

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
      className="border border-gray rounded-4xl py-[64px] md:mt-[88px] shadow bg-[#cacac8]"
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
                className="flex flex-col lg:flex-row justify-center gap-8 pb-8 lg:py-8 border border-gray shadow rounded-2xl"
              >
                <div className="shrink-0 flex justify-center rounded-2xl shadow">
                  <Image
                    src={item.image}
                    alt="Foto de perfil"
                    width={420}
                    height={400}
                    className="border border-gray rounded-2xl"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-2 lg:ml-8 lg:w-1/2">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-geo-alt-fill"></i>
                    <h3>{item.location}</h3>
                  </div>
                  <p className="text-lg/8 ">{item.content}</p>
                  <div className="flex justify-center lg:justify-start">
                    <ButtonGreen url={item.curriculum} className="shadow mt-4">
                      <span className="flex items-center gap-2">
                        <p className="font-medium">Currículo</p>
                        <i className="bi bi-arrow-down-circle"></i>
                      </span>
                    </ButtonGreen>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="felx flex-col items-center justify-center text-dark mt-8">
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
