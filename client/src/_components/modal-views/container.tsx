"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "rizzui";
import { useModal } from "./use-modal";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    // סגירת המודל בעת שינוי נתיב
    if (isOpen) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  console.log("GlobalModal rendering state:", { isOpen, size, customSize });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      size={size}
      overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
      containerClassName="z-[9999] fixed inset-0 flex items-center justify-center"
      className="!max-w-[90%] !max-h-[90vh] overflow-auto bg-white rounded-lg shadow-xl z-[10000]"
    >
      {view}
    </Modal>
  );
}
