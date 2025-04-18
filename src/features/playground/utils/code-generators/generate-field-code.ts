export function generateFieldCode(name: string, label: string) {
  return `  <form.Field
    name="${name}"
    children={(field) => (
      <div className=\"space-y-1\">  
        <Label htmlFor=\"${name}\">${label}</Label>
        <Input
          id=\"${name}\"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
        {field.state.meta.isTouched &&
          field.state.meta.errors.map((message, index) => (
            <p key={index} className=\"text-sm font-medium text-destructive\">{message}</p>
          ))}
      </div>
    )}
  />`;
}
