import { useFieldContext } from "..";
import FieldErrors from "./field-errors";
import { FileUpload } from "../../file-upload";

type FileUploadFieldProps = {
  label?: string;
  fieldLabel?: string;
  btnLabel?: string;
  accept?: "img" | "pdf" | "csv" | "imgAndPdf" | "all";
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  showPreview?: boolean;
  className?: string;
};

const FileUploadField = ({
  accept = "all",
  maxSize,
  maxFiles = 1,
  multiple = false,
  showPreview = true,
  className,
}: FileUploadFieldProps) => {
  const field = useFieldContext<File | File[] | null>();

  // המרת ערכי accept למחרוזות MIME מתאימות
  const getAcceptString = (acceptType: string): string => {
    switch (acceptType) {
      case "img":
        return "image/*";
      case "pdf":
        return "application/pdf";
      case "csv":
        return ".csv,text/csv";
      case "imgAndPdf":
        return "image/*,application/pdf";
      case "all":
      default:
        return "*";
    }
  };

  const handleFilesChange = (files: File[]) => {
    if (multiple) {
      field.handleChange(files);
    } else {
      field.handleChange(files.length > 0 ? files[0] : null);
    }
  };

  return (
    <div className="space-y-2">
      <FileUpload
        accept={getAcceptString(accept)}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={multiple}
        onFilesChange={handleFilesChange}
        showPreview={showPreview}
        disabled={field.form.state.isSubmitting}
        className={className}
      />
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};

export default FileUploadField;
