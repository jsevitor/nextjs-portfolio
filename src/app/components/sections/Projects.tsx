"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "@/app/components/common/Buttons";
import { ProjectCardSkeleton } from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { Modal } from "../layout/Modal";
import { COLORS } from "@/utils/colors";

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [techs, setTechs] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

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
    <section className="" id="projects">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 py-8">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              PROJETOS EM DESTAQUE
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t-2 border-b-2 border-gray">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <ProjectCardSkeleton key={idx} />
                ))
              : projects
                  .filter((p) => p.isFeatured)
                  .slice(0, 4)
                  .map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex flex-col gap-2 p-4 border-gray 
                        ${idx % 2 === 0 ? "lg:border-r-2" : ""} 
                        ${idx >= 2 ? "border-t-2" : ""}
                        ${idx === 1 ? "border-t-2 lg:border-t-0" : ""}
                      `}
                      onClick={() => {
                        setTitle(item.title);
                        setDescription(item.description);
                        setImage(item.image);
                        setDemoUrl(item.demoUrl);
                        setRepoUrl(item.repoUrl);
                        setTechs(
                          item.projectTechs.map(({ tech }) => tech.name)
                        );
                        setModalIsOpen(true);
                      }}
                    >
                      <div
                        className="shrink-0 rounded-2xl shadow hover:scale-102 transition-all duration-300 cursor-pointer pt-4"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={752}
                          height={354}
                          className="rounded-2xl"
                        />
                        <div className="flex flex-col gap-2 px-4 pb-4">
                          <div className="text-xl font-extrabold text-white">
                            {item.title}
                          </div>
                          <div className="text-sm flex gap-2 flex-wrap sm:mb-0">
                            {item.projectTechs.slice(0, 5).map(({ tech }) => (
                              <span
                                key={tech.id}
                                className="border border-white px-2 py-0.5 rounded-full flex justify-center text-white"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white font-medium text-lg">
                            Ver detalhes
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>

          <Modal
            isOpen={modalIsOpen}
            onClose={() => {
              setModalIsOpen(false);
            }}
            title={title}
            description={description}
            image={image}
            demoUrl={demoUrl}
            repoUrl={repoUrl}
            techs={techs}
          />
          <div className="flex justify-center ">
            <ButtonPrimary url="/projects" className="mt-4 font-bold">
              {" "}
              Ver todos os projetos
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </section>
  );
}
