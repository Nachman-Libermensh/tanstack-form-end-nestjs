"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

import { UploadIcon, XIcon, FileIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionIcon, Button, Text } from "rizzui";

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  showPreview?: boolean;
}

export function FileUpload({
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 5,
  multiple = true,
  disabled = false,
  onFilesChange,
  className,
  showPreview = true,
}: FileUploadProps) {
  const t = useTranslations("common.fileUpload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles || selectedFiles.length === 0) return;

      setError(null);

      // Validate file count
      if (files.length + selectedFiles.length > maxFiles) {
        setError(t("tooManyFiles", { max: maxFiles }));
        return;
      }

      const newFiles: File[] = [];

      // Validate each file
      Array.from(selectedFiles).forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          setError(
            t("fileTooLarge", {
              name: file.name,
              size: (maxSize / (1024 * 1024)).toFixed(1),
            })
          );
          return;
        }

        // Check file type if accept is specified
        if (accept !== "*") {
          const fileType = file.type;
          const acceptTypes = accept.split(",").map((type) => type.trim());

          const isAccepted = acceptTypes.some((type) => {
            if (type.startsWith(".")) {
              // Handle extension
              return file.name.endsWith(type);
            } else if (type.includes("*")) {
              // Handle wildcards like image/*
              return fileType.startsWith(type.split("*")[0]);
            }
            return fileType === type;
          });

          if (!isAccepted) {
            setError(t("invalidFileType", { name: file.name, types: accept }));
            return;
          }
        }

        newFiles.push(file);
      });

      if (newFiles.length > 0) {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    },
    [files, maxFiles, maxSize, accept, onFilesChange, t]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFileChange(e.dataTransfer.files);
    },
    [handleFileChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    },
    [files, onFilesChange]
  );

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files)}
      />

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        onClick={disabled ? undefined : triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={disabled ? undefined : handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <UploadIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <Text className="font-medium">{t("dropFiles")}</Text>
            <Text className="text-sm text-muted-foreground">
              {t("dragAndDrop")}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {t("maxSize", { size: (maxSize / (1024 * 1024)).toFixed(1) })} MB
              {accept !== "*" && ` • ${t("acceptedTypes")}: ${accept}`}
            </Text>
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              triggerFileInput();
            }}
          >
            {t("browseFiles")}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          <Text className="font-medium">{t("selectedFiles")}</Text>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    {file.type.startsWith("image/") ? (
                      <ImageIcon className="w-5 h-5" />
                    ) : (
                      <FileIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <Text className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </div>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  onClick={() => removeFile(index)}
                >
                  <XIcon className="w-4 h-4" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
