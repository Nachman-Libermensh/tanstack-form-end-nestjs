import { useFieldContext } from "..";
import FileUpload from "@/app/shared/file-upload";
import { ComponentProps } from "react";

type FileUploadFieldProps = {
  label?: string;
  fieldLabel?: string;
  btnLabel?: string;
  accept?: "img" | "pdf" | "csv" | "imgAndPdf" | "all";
  description?: string;
} & Omit<
  ComponentProps<typeof FileUpload>,
  "label" | "fieldLabel" | "btnLabel" | "accept" | "onChange"
>;

const FileUploadField = ({
  label,
  fieldLabel,
  btnLabel,
  accept = "all",
  description,
  ...props
}: FileUploadFieldProps) => {
  const field = useFieldContext<File | null>();

  return (
    <div className="space-y-2">
      <FileUpload
        label={label}
        fieldLabel={fieldLabel}
        btnLabel={btnLabel}
        accept={accept}
        onChange={(file: File) => {
          field.handleChange(file);
        }}
        error={
          field.state.meta.isTouched && field.state.meta.errors.length > 0
            ? field.state.meta.errors.join(", ")
            : undefined
        }
        {...props}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FileUploadField;
