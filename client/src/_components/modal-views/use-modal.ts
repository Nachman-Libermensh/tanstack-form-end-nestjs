"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { ModalSize } from "rizzui";

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  size?: ModalSize;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: "320px",
  size: "sm",
});

// עדכון בקובץ use-modal.ts
export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    size,
  }: {
    view: React.ReactNode;
    customSize?: string;
    size?: ModalSize;
  }) => {
    console.log("מנסה לפתוח מודל:", { size, customSize });
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      size,
    });
    console.log("מודל נפתח בהצלחה");
  };

  const closeModal = () => {
    console.log("סוגר מודל");
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
