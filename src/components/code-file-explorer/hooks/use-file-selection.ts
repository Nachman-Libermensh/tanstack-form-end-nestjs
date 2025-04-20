import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useFileSelection(initialFileId: string) {
  const [selectedId, setSelectedId] = useState<string>(initialFileId);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const selectFile = (id: string) => {
    setSelectedId(id);

    // סגירת הסיידבר במובייל כשבוחרים קובץ
    if (isMobile) {
      document.body.click(); // סגירה פשוטה של הסיידבר במובייל ע"י קליק בגוף
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return {
    selectedId,
    copied,
    selectFile,
    handleCopy,
  };
}
