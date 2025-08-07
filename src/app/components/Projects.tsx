"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonBlack, ButtonWhite } from "./Buttons";
import { ProjectCardSkeleton } from "./Skeletons";
import API_URL from "@/lib/apiConfig";

interface Project {
  id: string;
  title: string;
  image: string;
  isFeatured: boolean;
  projectTechs: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  demoUrl: string;
  repoUrl: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4  md:px-0 pt-[88px]" id="projects">
      <div className="flex flex-col gap-8 py-8">
        <div className="border-l-2 border-foreground pl-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[100] py-2">
            PROJETOS
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ProjectCardSkeleton key={idx} />
              ))
            : projects
                .filter((p) => p.isFeatured)
                .slice(0, 4)
                .map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div className="shrink-0 rounded">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={750}
                        height={354}
                        className="rounded"
                      />
                    </div>
                    <div>{item.image}</div>
                    <div className="text-xl">{item.title}</div>
                    <div className="font-extralight">
                      {item.projectTechs
                        .map(({ tech }) => tech.name)
                        .join(" | ")}
                    </div>
                    <div className="flex gap-4 mt-4">
                      <ButtonWhite label="Demo" url={item.demoUrl} />
                      <ButtonBlack label="Repositorio" url={item.repoUrl} />
                    </div>
                  </div>
                ))}
        </div>

        <div className="flex justify-center ">
          <ButtonWhite label="Ver todos os projetos" url="/projects" />
        </div>
      </div>
    </div>
  );
}
