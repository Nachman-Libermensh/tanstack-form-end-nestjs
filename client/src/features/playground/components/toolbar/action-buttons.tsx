"use client";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { Button } from "@/components/ui/button";
import { FileDown, Code, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import TanstackCodeViewer from "../code-generation/tanstack-code-viewer";

export default function ActionButtons() {
  const { fields, resetForm, exportFormAsJson } = useFormBuilder();
  const [showCode, setShowCode] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={exportFormAsJson}
          disabled={fields.length === 0}
          className="flex items-center gap-1"
        >
          <FileDown size={16} />
          <span>ייצא טופס</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(true)}
          disabled={fields.length === 0}
          className="flex items-center gap-1"
        >
          <Code size={16} />
          <span>הצג קוד</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={fields.length === 0}
              className="flex items-center gap-1"
            >
              <Trash2 size={16} />
              <span>איפוס טופס</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את כל הנתונים של הטופס הנוכחי. לא ניתן לבטל פעולה
                זו.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <AlertDialogAction onClick={resetForm}>
                כן, אפס טופס
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Dialog open={showCode} onOpenChange={setShowCode}>
        <DialogContent className="w-max min-w-5xl max-w-full">
          <DialogHeader>
            <DialogTitle>קוד מחולל</DialogTitle>
          </DialogHeader>
          {/* <TanstackCodeViewer /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
