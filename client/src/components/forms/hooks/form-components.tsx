import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFormContext } from "./form-core";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
// כפתור שליחת טופס
export const SubmitButton = ({
  children,
  className,
  loadingText = "שולח...",
  ...props
}: ButtonProps & { loadingText?: string }) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="submit"
          className={className}
          disabled={isSubmitting || props.disabled}
          {...props}
        >
          {isSubmitting ? loadingText : children}
        </Button>
      )}
    </form.Subscribe>
  );
};

// רכיב איפוס טופס
export const ResetButton = ({ children, className, ...props }: ButtonProps) => {
  const form = useFormContext();

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={() => form.reset()}
      {...props}
    >
      {children}
    </Button>
  );
};

// מכל הטופס

export const FormContainer = ({
  children,
  className,
  title,
  description,
  withCard = true,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  withCard?: boolean;
}) => {
  const form = useFormContext();

  const content = (
    <div className={cn("space-y-6", className)}>
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}
      <div className="space-y-4">{children}</div>
      <form.Subscribe selector={(state) => state.errors}>
        {(errors) => {
          const errorCount = Object.keys(errors).length;
          if (errorCount === 0) return null;

          return (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              <p className="font-medium">נמצאו {errorCount} שגיאות בטופס:</p>
              <ul className="list-disc list-inside mt-2">
                {Object.entries(errors).map(([field, errorMessages]) => (
                  <li key={field}>
                    {field}:{" "}
                    {Array.isArray(errorMessages)
                      ? errorMessages.join(", ")
                      : typeof errorMessages === "object"
                      ? JSON.stringify(errorMessages)
                      : String(errorMessages)}
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </form.Subscribe>
    </div>
  );

  if (withCard) {
    return <Card className="p-6">{content}</Card>;
  }

  return content;
};
