import React from "react";
type FormLayoutProps = {
  children: React.ReactNode;
  className?: string;
  dir?: "rtl" | "ltr";
};

const FormLayout = ({ children, className, dir = "rtl" }: FormLayoutProps) => {
  return (
    <div dir={dir} className={`flex flex-col gap-4 w-full ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default FormLayout;
