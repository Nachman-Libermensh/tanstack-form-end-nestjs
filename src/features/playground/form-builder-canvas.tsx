// גרסה מעודכנת עם חוויית משתמש ועיצוב משופרים
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useDirection } from "@/i18n/direction";
import {
  Plus,
  Text,
  Mail,
  Hash,
  ChevronDown,
  CheckSquare,
  GripVertical,
  Trash,
} from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

interface SortableFieldItemProps {
  field: FieldItem;
  selectedFieldId: string | null;
  selectField: (id: string) => void;
  removeField: (id: string) => void;
  isDragOverlay?: boolean;
}

function SortableFieldItem({
  field,
  selectedFieldId,
  selectField,
  removeField,
  isDragOverlay = false,
}: SortableFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    disabled: isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      className={`group flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
        selectedFieldId === field.id
          ? "border-primary bg-primary/5"
          : "border-muted"
      } ${isDragging ? "opacity-40" : ""} ${
        isDragOverlay ? "shadow-lg ring-2 ring-primary border-primary" : ""
      }`}
      onClick={() => selectField(field.id)}
    >
      <div
        className="text-muted-foreground cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-medium text-base">{field.label}</span>
        <span className="text-sm text-muted-foreground">
          {field.name} · {field.type}
          {field.required && " · חובה"}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          removeField(field.id);
        }}
      >
        <Trash size={16} />
      </Button>
    </motion.li>
  );
}

export default function FormBuilderCanvas() {
  const {
    fields,
    selectedFieldId,
    addField,
    removeField,
    selectField,
    reorderFields,
  } = useFormBuilder();

  const dir = useDirection();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeField = React.useMemo(
    () => fields.find((field) => field.id === activeId),
    [activeId, fields]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderFields(active.id as string, over.id as string);
    }
    setActiveId(null);
  };

  const handleAddField = (fieldConfig: any) => {
    setTimeout(() => {
      const element = document.getElementById("fields-container");
      element?.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    }, 100);
    addField(fieldConfig);
  };

  return (
    <Card className="border-muted shadow-lg">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">בונה טפסים</CardTitle>
            <CardDescription className="text-sm">
              גרור שדות, סדר ונהל את טופסך בקלות
            </CardDescription>
          </div>
          <Badge variant="outline">{fields.length} שדות</Badge>
        </div>

        <DropdownMenu dir={dir}>
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-center gap-2">
              <Plus size={16} /> הוסף שדה חדש
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-72">
            <DropdownMenuItem
              onClick={() =>
                handleAddField({ type: "text", label: "שדה טקסט" })
              }
            >
              <Text size={16} className="mr-2" /> שדה טקסט
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddField({ type: "email", label: "אימייל" })}
            >
              <Mail size={16} className="mr-2" /> אימייל
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddField({ type: "number", label: "מספר" })}
            >
              <Hash size={16} className="mr-2" /> מספר
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddField({ type: "select", label: "בחירה" })}
            >
              <ChevronDown size={16} className="mr-2" /> רשימת בחירה
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleAddField({ type: "checkbox", label: "אישור" })
              }
            >
              <CheckSquare size={16} className="mr-2" /> תיבת סימון
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        {fields.length === 0 ? (
          <motion.div
            className="text-center p-8 border-2 border-dashed rounded-lg bg-muted/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-muted-foreground text-sm">
              אין שדות בטופס. השתמש בכפתור להוספת שדות חדשים.
            </p>
          </motion.div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                id="fields-container"
                className="max-h-[60vh] overflow-y-auto pr-1"
              >
                <AnimatePresence>
                  <ul className="space-y-3">
                    {fields.map((field) => (
                      <SortableFieldItem
                        key={field.id}
                        field={field}
                        selectedFieldId={selectedFieldId}
                        selectField={selectField}
                        removeField={removeField}
                      />
                    ))}
                  </ul>
                </AnimatePresence>
              </div>
            </SortableContext>
            <DragOverlay adjustScale>
              {activeId && activeField && (
                <SortableFieldItem
                  field={activeField}
                  selectedFieldId={selectedFieldId}
                  selectField={selectField}
                  removeField={removeField}
                  isDragOverlay
                />
              )}
            </DragOverlay>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}
