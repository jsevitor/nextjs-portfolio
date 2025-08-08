"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonBlack, ButtonWhite } from "@/app/components/common/Buttons";
import { ProjectCardSkeleton } from "@/app/components/feedback/Skeletons";
import API_URL from "@/lib/apiConfig";
import { Modal } from "../layout/Modal";

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
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 border border-gray-medium cursor-pointer hover:opacity-70 scale-100 hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={() => {
                      setTitle(item.title);
                      setDescription(item.description);
                      setImage(item.image);
                      setDemoUrl(item.demoUrl);
                      setRepoUrl(item.repoUrl);
                      setTechs(item.projectTechs.map(({ tech }) => tech.name));
                      setModalIsOpen(true);
                    }}
                  >
                    <div className="shrink-0 ">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={752}
                        height={354}
                      />
                    </div>
                    <div className="flex flex-col gap-2 px-4 pb-4">
                      <div className="text-xl">{item.title}</div>
                      <div className="text-sm font-light flex gap-2">
                        {item.projectTechs.slice(0, 5).map(({ tech }) => (
                          <span
                            key={tech.id}
                            className="border border-gray-medium text-gray-medium px-2 py-0.5 rounded flex justify-center"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <ButtonWhite
                          label="Demo"
                          url={item.demoUrl}
                          className="w-1/4"
                        />
                        <ButtonBlack
                          label="Repositorio"
                          url={item.repoUrl}
                          className="w-1/4"
                        />
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
        >
          <div className="relative w-full flex-shrink-0 ">
            <>
              <div className="shrink-0">
                <Image src={image} alt={title} width={672} height={300} />
              </div>
              <button
                className="absolute top-4 right-4 text-background hover:text-gray-medium w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-90"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="2xl:text-xl">{title}</h3>
                <p className="text-sm font-extralight">{description}</p>
              </div>
              <div className="flex flex-col my-2">
                <h4 className="text-sm h-8 flex justify-center uppercase tracking-widest ">
                  Tecnologias
                </h4>

                <div className="flex flex-col items-center">
                  <p className="flex flex-wrap justify-center gap-2 text-sm font-light border-b border-t border-foreground py-4 px-4">
                    {techs.map((tech, i) => (
                      <span
                        key={i}
                        className="border border-gray-medium bg-foreground text-background w-48 p-1 rounded flex justify-center"
                      >
                        {tech}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center mb-2">
                <ButtonWhite label="Demo" url={demoUrl} className="w-1/3" />
                <ButtonBlack
                  label="Repositorio"
                  url={repoUrl}
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </Modal>

        <div className="flex justify-center ">
          <ButtonWhite label="Ver todos os projetos" url="/projects" />
        </div>
      </div>
    </div>
  );
}
