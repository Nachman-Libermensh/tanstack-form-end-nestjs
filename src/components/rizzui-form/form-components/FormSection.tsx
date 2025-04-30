"use client";
import React from "react";

export type FormSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function FormSection({
  title,
  children,
  className,
}: FormSectionProps) {
  return (
    <div
      className={`rounded-lg p-4 shadow-sm border border-gray-200 ${className ?? ""}`}
    >
      <h3 className="text-base font-medium text-gray-800 border-b pb-2 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
