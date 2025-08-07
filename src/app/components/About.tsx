"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AboutSkeleton, StacksSkeleton } from "./Skeletons";
import API_URL from "@/lib/apiConfig";

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
    <div className="container mx-auto px-4 md:px-0 pt-[88px]" id="about">
      <div className="flex flex-col gap-8 py-8">
        <div className="border-l-2 border-foreground pl-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[100] py-2">
            SOBRE
          </h1>
        </div>
        {loading ? (
          <AboutSkeleton />
        ) : (
          aboutData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col lg:flex-row justify-center gap-8 my-16"
            >
              <div className="shrink-0 flex justify-center">
                <Image
                  src={item.image}
                  alt="Foto de perfil"
                  width={400}
                  height={400}
                  className="border border-foreground"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-2 lg:ml-8 lg:w-1/2">
                <div className="flex items-center gap-2">
                  <i className="bi bi-geo-alt-fill"></i>
                  <h3>{item.location}</h3>
                </div>
                <p className="text-lg/8 font-extralight ">{item.content}</p>
                <div className="flex justify-center lg:justify-start">
                  <a href={item.curriculum} target="_blank">
                    <button className="flex items-center gap-2 font-medium bg-foreground text-background px-8 py-1 rounded cursor-pointer mt-8 hover:bg-gray-medium">
                      Currículo
                      <i className="bi bi-arrow-down-circle"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="felx flex-col items-center justify-center text-gray-medium">
          <h3 className="text-lg  text-center mb-4">TECH STACKS</h3>

          {loading ? (
            <StacksSkeleton />
          ) : (
            <div className="flex justify-center flex-wrap gap-4 lg:justify-between border border-gray-medium py-4 px-8">
              {stacks.map((item) => (
                <div key={item.id} className="flex flex-col items-center gap-4">
                  <i className={`${item.icon} text-6xl`}></i>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
