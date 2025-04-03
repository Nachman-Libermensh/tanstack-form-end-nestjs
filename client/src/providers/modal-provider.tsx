"use client";

import dynamic from "next/dynamic";

const ModalContainer = dynamic(
  () => import("@/_components/modal-views/container"),
  { ssr: false }
);

export function ModalProvider() {
  return <ModalContainer />;
}
