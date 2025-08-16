"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";
import { ButtonPrimary, ButtonSecondary } from "../common/Buttons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  techs: string[];
  demoUrl: string;
  repoUrl: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  demoUrl,
  repoUrl,
  techs,
}: ModalProps) {
  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-[#0f0f0fbd] flex items-center justify-center z-80"
      className="flex flex-col bg-background shadow-lg w-full mx-auto max-w-2xl sm:h-fit outline-none border border-dark rounded-2xl"
      contentLabel="Modal"
    >
      <div className="relative w-full flex-shrink-0">
        <button
          className="absolute top-3 right-3 text-foreground hover:text-accent-green"
          onClick={() => {
            onClose();
          }}
        >
          <i className="bi bi-x-lg text-lg"></i>
        </button>
      </div>

      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-extrabold">{title}</h3>
            <p>{description}</p>
          </div>
          <div className="flex flex-col my-2">
            <h4 className="text-sm h-8 flex justify-center uppercase tracking-widest font-bold">
              Tecnologias
            </h4>

            <div className="flex flex-col items-center">
              <p className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm border border-gray py-4 px-2 bg-[#cacac8] rounded-2xl">
                {techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="border border-dark text-foreground lg:w-48 p-1 rounded-full flex justify-center"
                  >
                    {tech}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center mb-2">
            <ButtonPrimary url={demoUrl} className="w-full md:w-1/3">
              {" "}
              Demo{" "}
            </ButtonPrimary>
            <ButtonSecondary url={repoUrl} className="w-full md:w-1/3">
              {" "}
              Repositório{" "}
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
