"use client";

import Image from "next/image";
import { ProjectSkeleton } from "@/app/components/feedback/Skeletons";
import { useEffect, useState } from "react";
import API_URL from "@/lib/apiConfig";
import { Modal } from "../components/layout/Modal";

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
                <div
                  key={item.id}
                  className="flex flex-col gap-4 cursor-pointer hover:opacity-70 scale-100 hover:scale-105 transition-all duration-300 ease-in-out pb-2 border border-gray-medium shadow shadow-gray-medium"
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
                  <div className="shrink-0 border-b border-gray-medium">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={520}
                      height={300}
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-4 px-2">
                    <div className="flex flex-col gap-2">
                      <h3 className="">{item.title}</h3>
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
