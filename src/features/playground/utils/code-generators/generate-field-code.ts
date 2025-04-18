export function generateFieldCode(
  name: string,
  label: string,
  placeholder?: string,
  required?: boolean
) {
  const placeholderAttr = placeholder ? `placeholder="${placeholder}"` : "";
  const requiredAttr = required ? "required" : "";

  return `      <div className="space-y-2">
        <Label htmlFor="${name}">${label}</Label>
        <form.Field
          name="${name}"
          children={( field ) => (
            <Input
              id="${name}"
              ${placeholderAttr}
              ${requiredAttr}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
      </div>`;
}
