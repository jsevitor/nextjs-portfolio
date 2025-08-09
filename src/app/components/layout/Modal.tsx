"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";
import { ButtonBlack, ButtonWhite } from "../common/Buttons";

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
  image,
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
      className="flex flex-col h-full bg-background shadow-lg w-full mx-auto max-w-2xl sm:h-fit text-sm outline-none border border-foreground"
      contentLabel="Modal"
    >
      <div className="relative w-full flex-shrink-0">
        <button
          className="absolute top-3 right-3 text-foreground hover:text-gray-medium w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-90"
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
            <h3 className="text-2xl">{title}</h3>
            <p className="text-sm font-light">{description}</p>
          </div>
          <div className="flex flex-col my-2">
            <h4 className="text-sm h-8 flex justify-center uppercase tracking-widest ">
              Tecnologias
            </h4>

            <div className="flex flex-col items-center">
              <p className="flex flex-wrap justify-center gap-2 text-sm border-b border-t border-foreground py-4">
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
            <ButtonBlack label="Repositorio" url={repoUrl} className="w-1/3" />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
