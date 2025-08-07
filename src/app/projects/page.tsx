"use client";

import Image from "next/image";
import { ProjectSkeleton } from "@/app/components/Skeletons";
import { useEffect, useState } from "react";
import { ButtonBlack, ButtonWhite } from "@/app/components/Buttons";
import API_URL from "@/lib/apiConfig";

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  projectTechs: {
    tech: {
      id: string;
      name: string;
    };
  }[];
  demoUrl: string;
  repoUrl: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      if (!res.ok) throw new Error("Erro ao buscar projetos");
      const data = await res.json();
      setProjects(data);
      console.log(data);
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
    <div
      className="container mx-auto px-4 my-16 md:px-0 pt-[88px]"
      id="projects"
    >
      <div className="flex flex-col gap-8 pb-8">
        <div className="border-l-2 border-foreground pl-8 mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[100] py-2">
            PROJETOS
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))
            : projects.map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <div className="shrink-0 rounded">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={520}
                      height={300}
                      className="rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="2xl:text-xl">{item.title}</h3>
                      <p className="text-sm font-extralight h-auto md:h-24 2xl:h-20">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm h-8">Tecnologias:</h4>
                      <p className="text-sm lg:text-xs 2xl:text-sm font-extralight">
                        {item.projectTechs
                          .map(({ tech }) => tech.name)
                          .join(" | ")}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <ButtonWhite label="Demo" url={item.demoUrl} />
                      <ButtonBlack label="Repositorio" url={item.repoUrl} />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
