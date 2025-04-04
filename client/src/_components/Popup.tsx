"use client";
import React from "react";
import { useModal } from "./modal-views/use-modal";
import { PiXBold } from "react-icons/pi";

import { ActionIcon, Title } from "rizzui";

interface AvatarPopupProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
}
const Popup = ({ children, title, onClose }: AvatarPopupProps) => {
  //colorPresetName

  const { closeModal } = useModal();

  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-lg flex flex-col justify-between">
      <div className="flex items-center justify-between mb-5">
        {title ? (
          <Title className={`text-lg font-bold  `}>{title}</Title>
        ) : (
          <div />
        )}
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => (onClose ? onClose() : closeModal())}
          className="text-gray-500 hover:!text-gray-900 flex justify-end"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      {children}
    </div>
  );
};
export default Popup;
