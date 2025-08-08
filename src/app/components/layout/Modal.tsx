"use client";

import { useEffect } from "react";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    ReactModal.setAppElement(document.body);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-[#0f0f0fbd] flex items-center justify-center z-80"
      className="flex flex-col h-full bg-background shadow-lg w-full mx-auto max-w-2xl sm:h-fit text-sm outline-none"
      contentLabel="Modal"
    >
      {children}
    </ReactModal>
  );
}
