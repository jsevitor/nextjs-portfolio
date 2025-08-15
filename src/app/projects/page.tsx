"use client";

import Image from "next/image";
import { ProjectSkeleton } from "@/app/components/feedback/Skeletons";
import { useEffect, useState } from "react";
import API_URL from "@/lib/apiConfig";
import { Modal } from "../components/layout/Modal";
import { COLORS } from "@/utils/colors";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [techs, setTechs] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
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
    <div className="container mx-auto px-4 mb-8 pt-[88px]" id="projects">
      <div className="flex flex-col gap-8 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl lg:text-8xl text-center font-extrabold py-2">
            PROJETOS
          </h1>
          <div className="text-center text-dark-gray lg:w-2/3 mx-auto text-sm">
            <p className="text-lg font-bold">Bem-vindo ao meu portfólio! </p>
            <p>
              Aqui você encontra uma coleção de projetos pessoais e acadêmicos
              que desenvolvi ao longo da minha trajetória. Cada trabalho reflete
              meu aprendizado, criatividade e paixão por tecnologia, abrangendo
              diferentes áreas e desafios do desenvolvimento web.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ProjectSkeleton key={idx} />
              ))
            : projects.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 shadow rounded-2xl overflow-hidden border border-gray p-4"
                >
                  <div
                    className="shrink-0 rounded-xl overflow-hidden cursor-pointer hover:opacity-70 scale-100 hover:scale-105 transition-all duration-300 ease-in-out"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
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
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={520}
                      height={300}
                    />
                    <div className="flex flex-col justify-center gap-4 px-2 text-white overflow-hidden">
                      <div
                        className="flex flex-col gap-2 font-extrabold overflow-hidden py-2 px-2
                      "
                      >
                        <h3 className="whitespace-nowrap overflow-hidden text-ellipsis text-lg">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
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
    </div>
  );
}
