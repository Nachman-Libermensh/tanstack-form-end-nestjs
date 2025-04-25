import { AnyFieldMeta } from "@tanstack/react-form";

export type ErrorPlacement = "top" | "bottom" | false;

type FieldErrorsProps = {
  meta: AnyFieldMeta;
  placement?: ErrorPlacement;
};

const FieldErrors = ({ meta, placement = "bottom" }: FieldErrorsProps) => {
  if (!meta.isTouched || placement === false) return null;

  return meta.errors.map((error, index) => (
    <p key={index} className="text-sm font-medium text-destructive">
      {error.message}
    </p>
  ));
};

export default FieldErrors;
