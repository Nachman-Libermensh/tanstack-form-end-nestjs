import { FieldConfig } from "../../types";

export function generateFieldCode(field: FieldConfig): string {
  const { name, label, placeholder, required, helperText } = field;

  switch (field.type) {
    case "textarea":
      return `          <form.Field
            name="${name}"
            children={(fieldApi) => (
              <div className="space-y-2">
                <Label htmlFor="${name}">${label}${required ? " *" : ""}</Label>
                <Textarea
                  id="${name}"
                  placeholder="${placeholder || ""}"
                  ${required ? "required" : ""}
                  rows={${field.rows || 4}}
                  value={fieldApi.state.value}
                  onBlur={fieldApi.handleBlur}
                  onChange={(e) => fieldApi.handleChange(e.target.value)}
                />
                ${
                  helperText
                    ? `<p className="text-sm text-muted-foreground">${helperText}</p>`
                    : ""
                }
                {fieldApi.state.meta.touchedErrors && (
                  <p className="text-sm text-destructive">
                    {fieldApi.state.meta.touchedErrors[0]}
                  </p>
                )}
              </div>
            )}
          />`;

    case "select":
      const options = field.options || [];
      return `          <form.Field
            name="${name}"
            children={(fieldApi) => (
              <div className="space-y-2">
                <Label htmlFor="${name}">${label}${required ? " *" : ""}</Label>
                <Select
                  value={fieldApi.state.value}
                  onValueChange={fieldApi.handleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="${placeholder || "בחר אפשרות"}" />
                  </SelectTrigger>
                  <SelectContent>
                    ${options
                      .map(
                        (opt) =>
                          `<SelectItem value="${opt.value}">${opt.label}</SelectItem>`
                      )
                      .join("\n                    ")}
                  </SelectContent>
                </Select>
                ${
                  helperText
                    ? `<p className="text-sm text-muted-foreground">${helperText}</p>`
                    : ""
                }
                {fieldApi.state.meta.touchedErrors && (
                  <p className="text-sm text-destructive">
                    {fieldApi.state.meta.touchedErrors[0]}
                  </p>
                )}
              </div>
            )}
          />`;

    case "checkbox":
      return `          <form.Field
            name="${name}"
            children={(fieldApi) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="${name}"
                  checked={fieldApi.state.value}
                  onCheckedChange={fieldApi.handleChange}
                />
                <Label htmlFor="${name}">${field.checkboxLabel || label}${
        required ? " *" : ""
      }</Label>
                ${
                  helperText
                    ? `<p className="text-sm text-muted-foreground">${helperText}</p>`
                    : ""
                }
                {fieldApi.state.meta.touchedErrors && (
                  <p className="text-sm text-destructive">
                    {fieldApi.state.meta.touchedErrors[0]}
                  </p>
                )}
              </div>
            )}
          />`;

    case "number":
    case "range":
      return `          <form.Field
            name="${name}"
            children={(fieldApi) => (
              <div className="space-y-2">
                <Label htmlFor="${name}">${label}${required ? " *" : ""}</Label>
                <Input
                  id="${name}"
                  type="${field.type === "range" ? "range" : "number"}"
                  placeholder="${placeholder || ""}"
                  ${
                    field.validations?.min !== undefined
                      ? `min={${field.validations.min}}`
                      : ""
                  }
                  ${
                    field.validations?.max !== undefined
                      ? `max={${field.validations.max}}`
                      : ""
                  }
                  ${required ? "required" : ""}
                  value={fieldApi.state.value}
                  onBlur={fieldApi.handleBlur}
                  onChange={(e) => fieldApi.handleChange(${
                    field.type === "range"
                      ? "e.target.value"
                      : "Number(e.target.value)"
                  })}
                />
                ${
                  helperText
                    ? `<p className="text-sm text-muted-foreground">${helperText}</p>`
                    : ""
                }
                {fieldApi.state.meta.touchedErrors && (
                  <p className="text-sm text-destructive">
                    {fieldApi.state.meta.touchedErrors[0]}
                  </p>
                )}
              </div>
            )}
          />`;

    default: // text, email, password, url, tel
      return `          <form.Field
            name="${name}"
            children={(fieldApi) => (
              <div className="space-y-2">
                <Label htmlFor="${name}">${label}${required ? " *" : ""}</Label>
                <Input
                  id="${name}"
                  type="${field.type}"
                  placeholder="${placeholder || ""}"
                  ${required ? "required" : ""}
                  value={fieldApi.state.value}
                  onBlur={fieldApi.handleBlur}
                  onChange={(e) => fieldApi.handleChange(e.target.value)}
                />
                ${
                  helperText
                    ? `<p className="text-sm text-muted-foreground">${helperText}</p>`
                    : ""
                }
                {fieldApi.state.meta.touchedErrors && (
                  <p className="text-sm text-destructive">
                    {fieldApi.state.meta.touchedErrors[0]}
                  </p>
                )}
              </div>
            )}
          />`;
  }
}
