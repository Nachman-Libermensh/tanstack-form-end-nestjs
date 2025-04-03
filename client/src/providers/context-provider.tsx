"use client";
import React from "react";

interface IProps {
  children?: React.ReactNode;
}

export interface IContext {
  popupOpen: boolean;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popupContent?: React.ReactNode;
  setPopupContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  popupTitle?: string;
  setPopupTitle: React.Dispatch<React.SetStateAction<string>>;
  popupWidth?: number;
  setPopupWidth: React.Dispatch<React.SetStateAction<number>>;
}
const Context = React.createContext<IContext>({
  popupOpen: false,
  setPopupOpen: () => {},
  popupContent: null,
  setPopupContent: () => {},
  popupTitle: "",
  setPopupTitle: () => {},
  popupWidth: 80,
  setPopupWidth: () => {},
});
const ContextProvider = ({ children }: IProps) => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupContent, setPopupContent] = React.useState<React.ReactNode>();
  const [popupTitle, setPopupTitle] = React.useState("");
  const [popupWidth, setPopupWidth] = React.useState<number>(80);
  return (
    <Context.Provider
      value={{
        popupOpen: popupOpen,
        setPopupOpen: setPopupOpen,
        popupContent: popupContent,
        setPopupContent: setPopupContent,
        popupTitle: popupTitle,
        setPopupTitle: setPopupTitle,
        popupWidth: popupWidth,
        setPopupWidth: setPopupWidth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
