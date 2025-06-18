/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useDirection } from "@/i18n/direction";
import { useTranslations } from "next-intl";
import {
  Plus,
  Text,
  Mail,
  Hash,
  ChevronDown,
  CheckSquare,
  GripVertical,
  Trash,
  Lock,
  Calendar,
  Clock,
  Upload,
  Sliders,
  Link,
  Phone,
  Palette,
  Edit3,
  Copy,
  Settings,
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
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// מרכיב סמן מיקום - סטטי ללא אנימציות
function DropIndicator({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`h-0.5 bg-primary rounded-full mx-4 ${
        position === "top" ? "-mt-[1px] mb-1" : "mt-1 -mb-[1px]"
      }`}
    />
  );
}

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

interface FieldTypeConfig {
  type: string;
  icon: React.ReactNode;
  category: "basic" | "advanced" | "specialized";
}

const fieldTypeConfigs: FieldTypeConfig[] = [
  // Basic fields
  { type: "text", icon: <Text size={18} />, category: "basic" },
  { type: "email", icon: <Mail size={18} />, category: "basic" },
  { type: "password", icon: <Lock size={18} />, category: "basic" },
  { type: "number", icon: <Hash size={18} />, category: "basic" },

  // Advanced fields
  { type: "textarea", icon: <Edit3 size={18} />, category: "advanced" },
  { type: "select", icon: <ChevronDown size={18} />, category: "advanced" },
  { type: "checkbox", icon: <CheckSquare size={18} />, category: "advanced" },

  // Specialized fields
  { type: "date", icon: <Calendar size={18} />, category: "specialized" },
  { type: "time", icon: <Clock size={18} />, category: "specialized" },
  { type: "file", icon: <Upload size={18} />, category: "specialized" },
  { type: "range", icon: <Sliders size={18} />, category: "specialized" },
  { type: "url", icon: <Link size={18} />, category: "specialized" },
  { type: "tel", icon: <Phone size={18} />, category: "specialized" },
  { type: "color", icon: <Palette size={18} />, category: "specialized" },
];

interface SortableFieldItemProps {
  field: FieldItem;
  selectedFieldId: string | null;
  selectField: (id: string) => void;
  removeField: (id: string) => void;
  duplicateField?: (id: string) => void;
  isDragOverlay?: boolean;
  isDragTarget?: boolean;
  dragPosition?: "top" | "bottom" | null;
}

function SortableFieldItem({
  field,
  selectedFieldId,
  selectField,
  removeField,
  duplicateField,
  isDragOverlay = false,
  isDragTarget = false,
  dragPosition = null,
}: SortableFieldItemProps) {
  const t = useTranslations("playground");

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
    <div className="relative">
      {isDragTarget && dragPosition === "top" && (
        <DropIndicator position="top" />
      )}

      <li
        ref={setNodeRef}
        style={style}
        className={`group flex items-center gap-3 p-4 bg-card border rounded-xl shadow-sm 
          transition-all duration-200 cursor-pointer hover:shadow-md ${
            selectedFieldId === field.id
              ? "border-primary bg-primary/5 shadow-primary/10"
              : "border-border hover:border-primary/50"
          } ${isDragging ? "opacity-40 border-dashed border-primary" : ""} ${
          isDragOverlay
            ? "shadow-xl ring-2 ring-primary border-primary scale-[1.03] bg-card"
            : ""
        }`}
        onClick={() => !isDragging && selectField(field.id)}
      >
        <div
          className={`flex-shrink-0 text-muted-foreground transition-colors
            ${
              isDragOverlay
                ? "cursor-grabbing text-primary"
                : "cursor-grab hover:text-primary group-hover:text-primary"
            }`}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={isDragOverlay ? 20 : 18} />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-base truncate">
              {field.label}
            </span>
            {field.required && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                {t("fieldEditor.fields.required")}
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground truncate">
            {field.name} · {t(`formBuilder.fieldTypes.${field.type}`)}
          </span>
        </div>

        <div
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            selectedFieldId === field.id || isDragOverlay
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {duplicateField && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                duplicateField(field.id);
              }}
              title={t("actions.duplicate")}
            >
              <Copy size={14} />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              selectField(field.id);
            }}
            title={t("fieldEditor.title")}
          >
            <Settings size={14} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              removeField(field.id);
            }}
            title={t("actions.delete")}
          >
            <Trash size={14} />
          </Button>
        </div>
      </li>

      {isDragTarget && dragPosition === "bottom" && (
        <DropIndicator position="bottom" />
      )}
    </div>
  );
}

export default function FormBuilderCanvas() {
  const t = useTranslations("playground");
  const {
    fields,
    selectedFieldId,
    addField,
    removeField,
    selectField,
    reorderFields,
  } = useFormBuilder();

  const dir = useDirection();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<"top" | "bottom" | null>(
    null
  );

  // מצא את השדה הפעיל שנגרר כרגע
  const activeField = useMemo(
    () => fields.find((field) => field.id === activeId),
    [activeId, fields]
  );

  // חיישני גרירה עם הגדרות אופטימליות
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // טיפול בתחילת הגרירה
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // ניסיון להפעלת רטט במכשירים תומכים

    // window.navigator.vibrate?.(50);
  };

  // טיפול במצב גרירה מעל אלמנט אחר
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      setOverId(null);
      setDragPosition(null);
      return;
    }

    // מציאת האינדקסים המתאימים לקביעת מיקום האינדיקטור
    const activeIndex = fields.findIndex((f) => f.id === active.id);
    const overIndex = fields.findIndex((f) => f.id === over.id);

    setOverId(over.id as string);

    if (activeIndex < overIndex) {
      setDragPosition("bottom");
    } else {
      setDragPosition("top");
    }
  };

  // טיפול בסיום הגרירה
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderFields(active.id as string, over.id as string);

      // ניסיון להפעלת רטט בסיום פעולה מוצלחת

      // window.navigator.vibrate?.([40, 30, 80]);
    }

    // ניקוי מצב גרירה
    setActiveId(null);
    setOverId(null);
    setDragPosition(null);
  };

  // הגדרות ברירת מחדל משופרות ליצירת שדות
  const createFieldWithDefaults = (type: string) => {
    const baseConfig = {
      type,
      label: t(`formBuilder.fieldTypes.${type}`),
      placeholder: t(`fieldEditor.fields.placeholder`),
    };

    // הגדרות ספציפיות לסוג שדה
    switch (type) {
      case "email":
        return {
          ...baseConfig,
          validations: {
            pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message: t("fieldEditor.validation.customMessage"),
          },
        };
      case "password":
        return {
          ...baseConfig,
          validations: {
            minLength: 8,
            pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
          },
          passwordOptions: {
            showToggle: true,
            showStrengthIndicator: true,
          },
        };
      case "select":
        return {
          ...baseConfig,
          options: [
            {
              label: t("fieldEditor.fields.defaultValue") + " 1",
              value: "option1",
            },
            {
              label: t("fieldEditor.fields.defaultValue") + " 2",
              value: "option2",
            },
          ],
        };
      default:
        return baseConfig;
    }
  };

  // הוספת שדה חדש
  const handleAddField = (type: string) => {
    const fieldConfig = createFieldWithDefaults(type);
    addField(fieldConfig);
  };

  const duplicateField = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      const duplicatedField = {
        ...field,
        name: `${field.name}_copy`,
        label: `${field.label} (Copy)`,
      };
      addField(duplicatedField);
    }
  };

  // קבוצת סוגי שדות לפי קטגוריה
  const groupedFieldTypes = fieldTypeConfigs.reduce((acc, config) => {
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push(config);
    return acc;
  }, {} as Record<string, FieldTypeConfig[]>);

  return (
    <Card className="border-muted shadow-lg">
      <CardHeader className="flex flex-col gap-3 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{t("formBuilder.title")}</CardTitle>
            <CardDescription className="text-sm mt-1">
              {t("formBuilder.subtitle")}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`transition-colors ${
              fields.length > 0
                ? "bg-primary/10 text-primary border-primary/30"
                : ""
            }`}
          >
            {t("formBuilder.fieldsCount", { count: fields.length })}
          </Badge>
        </div>

        <div className="transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]">
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <Button className="w-full justify-center gap-2 font-medium shadow-sm">
                <Plus size={16} /> {t("formBuilder.addFieldButton")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-80 p-2">
              {Object.entries(groupedFieldTypes).map(([category, configs]) => (
                <div key={category}>
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-1">
                    {category === "basic"
                      ? "Basic Fields"
                      : category === "advanced"
                      ? "Advanced Fields"
                      : "Specialized Fields"}
                  </DropdownMenuLabel>

                  <div className="grid grid-cols-2 gap-1 mb-2">
                    {configs.map((config) => (
                      <DropdownMenuItem
                        key={config.type}
                        onClick={() => handleAddField(config.type)}
                        className="cursor-pointer flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors"
                      >
                        <span className="text-primary/80">{config.icon}</span>
                        <span className="text-sm font-medium">
                          {t(`formBuilder.fieldTypes.${config.type}`)}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>

                  {category !== "specialized" && (
                    <DropdownMenuSeparator className="my-2" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-5">
        {fields.length === 0 ? (
          <div className="text-center py-12 px-6 border-2 border-dashed rounded-xl bg-muted/10 transition-all">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-muted/20">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                {t("formBuilder.noFields")}
              </p>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                id="fields-container"
                className="max-h-[60vh] overflow-y-auto pr-2 py-1 space-y-1"
              >
                <ul className="space-y-3 my-1 pb-1">
                  {fields.map((field) => (
                    <SortableFieldItem
                      key={field.id}
                      field={field}
                      selectedFieldId={selectedFieldId}
                      selectField={selectField}
                      removeField={removeField}
                      duplicateField={duplicateField}
                      isDragTarget={overId === field.id}
                      dragPosition={overId === field.id ? dragPosition : null}
                    />
                  ))}
                </ul>
              </div>
            </SortableContext>

            <DragOverlay adjustScale={false}>
              {activeId && activeField && (
                <SortableFieldItem
                  field={activeField}
                  selectedFieldId={selectedFieldId}
                  selectField={selectField}
                  removeField={removeField}
                  isDragOverlay={true}
                />
              )}
            </DragOverlay>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}
