import { useStore } from "@tanstack/react-form";
import { useFormContext } from "..";
import { Button } from "rizzui";
import cn from "@/ui/utils/class-names";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton = ({ children, className = "" }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button
      type="submit"
      className={cn(className)}
      disabled={isSubmitting || !canSubmit}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;
