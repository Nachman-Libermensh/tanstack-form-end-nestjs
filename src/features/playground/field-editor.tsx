import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Filter, Palette, Zap } from "lucide-react";
import { useDirection } from "@/i18n/direction";
import { useTranslations } from "next-intl";

export default function FieldEditor() {
  const t = useTranslations("playground");
  const { updateField, selectedFieldId, fields } = useFormBuilder();
  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const dir = useDirection();

  if (!selectedField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("fieldEditor.title")}</CardTitle>
          <CardDescription>
            {t("fieldEditor.selectFieldPrompt")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-muted/20">
              <Settings size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {t("fieldEditor.noFieldSelected")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card dir={dir} className="border-2 border-primary/10">
      <CardHeader>
        <CardTitle>
          {t("fieldEditor.title")} {selectedField.label}
        </CardTitle>
        <CardDescription>{t("fieldEditor.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs dir={dir} defaultValue="basic">
          <TabsList className="grid grid-cols-4 mb-6 border-amber-100">
            <TabsTrigger
              value="basic"
              className="flex items-center gap-2 text-xs"
            >
              <Settings size={14} /> {t("fieldEditor.tabs.basic")}
            </TabsTrigger>
            <TabsTrigger
              value="validation"
              className="flex items-center gap-2 text-xs"
            >
              <Filter size={14} /> {t("fieldEditor.tabs.validation")}
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="flex items-center gap-2 text-xs"
            >
              <Palette size={14} /> {t("fieldEditor.tabs.appearance")}
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="flex items-center gap-2 text-xs"
            >
              <Zap size={14} /> {t("fieldEditor.tabs.advanced")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-label">
                {t("fieldEditor.fields.label")}
              </Label>
              <Input
                id="field-label"
                value={selectedField.label}
                onChange={(e) =>
                  updateField(selectedField.id, { label: e.target.value })
                }
                placeholder={t("fieldEditor.fields.label")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-name">{t("fieldEditor.fields.name")}</Label>
              <Input
                id="field-name"
                value={selectedField.name}
                onChange={(e) =>
                  updateField(selectedField.id, { name: e.target.value })
                }
                placeholder="field_name"
              />
              <p className="text-xs text-muted-foreground">
                {t("fieldEditor.fields.nameHint")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-default">
                {t("fieldEditor.fields.defaultValue")}
              </Label>
              <Input
                id="field-default"
                value={selectedField.defaultValue || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    defaultValue: e.target.value,
                  })
                }
                placeholder={t("fieldEditor.fields.defaultValue")}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="field-required" className="text-sm font-medium">
                {t("fieldEditor.fields.required")}
              </Label>
              <Switch
                id="field-required"
                checked={!!selectedField.required}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, { required: checked });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="validation" className="space-y-4">
            {(selectedField.type === "text" ||
              selectedField.type === "textarea" ||
              selectedField.type === "password") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="field-min-length">
                    {t("fieldEditor.validation.minLength")}
                  </Label>
                  <Input
                    id="field-min-length"
                    type="number"
                    value={selectedField.validations?.minLength ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField(selectedField.id, {
                        validations: {
                          ...selectedField.validations,
                          minLength: value === "" ? undefined : Number(value),
                        },
                      });
                    }}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field-max-length">
                    {t("fieldEditor.validation.maxLength")}
                  </Label>
                  <Input
                    id="field-max-length"
                    type="number"
                    value={selectedField.validations?.maxLength ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField(selectedField.id, {
                        validations: {
                          ...selectedField.validations,
                          maxLength: value === "" ? undefined : Number(value),
                        },
                      });
                    }}
                    placeholder="100"
                  />
                </div>
              </>
            )}

            {selectedField.type === "number" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="field-min">
                    {t("fieldEditor.validation.min")}
                  </Label>
                  <Input
                    id="field-min"
                    type="number"
                    value={selectedField.validations?.min ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField(selectedField.id, {
                        validations: {
                          ...selectedField.validations,
                          min: value === "" ? undefined : Number(value),
                        },
                      });
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field-max">
                    {t("fieldEditor.validation.max")}
                  </Label>
                  <Input
                    id="field-max"
                    type="number"
                    value={selectedField.validations?.max ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateField(selectedField.id, {
                        validations: {
                          ...selectedField.validations,
                          max: value === "" ? undefined : Number(value),
                        },
                      });
                    }}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="field-pattern">
                {t("fieldEditor.validation.pattern")}
              </Label>
              <Input
                id="field-pattern"
                value={selectedField.validations?.pattern || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    validations: {
                      ...selectedField.validations,
                      pattern: e.target.value,
                    },
                  })
                }
                placeholder="^[A-Za-z]+$"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-message">
                {t("fieldEditor.validation.customMessage")}
              </Label>
              <Textarea
                id="field-message"
                value={selectedField.validations?.message || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    validations: {
                      ...selectedField.validations,
                      message: e.target.value,
                    },
                  })
                }
                rows={2}
                placeholder={t("fieldEditor.validation.customMessage")}
              />
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-placeholder">
                {t("fieldEditor.fields.placeholder")}
              </Label>
              <Input
                id="field-placeholder"
                value={selectedField.placeholder || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    placeholder: e.target.value,
                  })
                }
                placeholder={t("fieldEditor.fields.placeholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-helper">
                {t("fieldEditor.fields.helperText")}
              </Label>
              <Textarea
                id="field-helper"
                value={selectedField.helperText || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    helperText: e.target.value,
                  })
                }
                rows={2}
                placeholder={t("fieldEditor.fields.helperText")}
              />
              <p className="text-xs text-muted-foreground">
                {t("fieldEditor.fields.helperTextHint")}
              </p>
            </div>

            {selectedField.type === "select" && (
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {selectedField.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option.label}
                        onChange={(e) => {
                          const newOptions = [...(selectedField.options || [])];
                          newOptions[index] = {
                            ...option,
                            label: e.target.value,
                          };
                          updateField(selectedField.id, {
                            options: newOptions,
                          });
                        }}
                        placeholder="Option label"
                      />
                      <Input
                        value={option.value}
                        onChange={(e) => {
                          const newOptions = [...(selectedField.options || [])];
                          newOptions[index] = {
                            ...option,
                            value: e.target.value,
                          };
                          updateField(selectedField.id, {
                            options: newOptions,
                          });
                        }}
                        placeholder="option_value"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="field-disabled" className="text-sm font-medium">
                {t("fieldEditor.fields.disabled")}
              </Label>
              <Switch
                id="field-disabled"
                checked={!!selectedField.disabled}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, { disabled: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="field-hidden" className="text-sm font-medium">
                {t("fieldEditor.fields.hidden")}
              </Label>
              <Switch
                id="field-hidden"
                checked={!!selectedField.hidden}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, { hidden: checked });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="field-readonly" className="text-sm font-medium">
                {t("fieldEditor.fields.readonly")}
              </Label>
              <Switch
                id="field-readonly"
                checked={!!selectedField.readonly}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, { readonly: checked });
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
