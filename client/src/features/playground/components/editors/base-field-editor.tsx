// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { FormFieldConfig } from "../../types";
// import { useFormBuilder } from "../../context/form-builder-context";

// export default function BaseFieldEditor({
//   field,
// }: {
//   field: FormFieldConfig;
// }) {
//   const { updateField } = useFormBuilder();

//   return (
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor={`${field.id}-name`}>שם (name)</Label>
//         <Input
//           id={`${field.id}-name`}
//           value={field.name}
//           onChange={(e) => updateField({ ...field, name: e.target.value })}
//         />
//         <p className="mt-1 text-xs text-muted-foreground">
//           השם שישמש בשליחת הטופס
//         </p>
//       </div>

//       <div>
//         <Label htmlFor={`${field.id}-label`}>תווית</Label>
//         <Input
//           id={`${field.id}-label`}
//           value={field.label}
//           onChange={(e) => updateField({ ...field, label: e.target.value })}
//         />
//         <p className="mt-1 text-xs text-muted-foreground">
//           התווית שתוצג למשתמש
//         </p>
//       </div>

//       <div className="flex items-center gap-2">
//         <Switch
//           id={`${field.id}-required`}
//           checked={field.required}
//           onCheckedChange={(checked) =>
//             updateField({ ...field, required: checked })
//           }
//         />
//         <Label htmlFor={`${field.id}-required`}>שדה חובה</Label>
//       </div>
//     </div>
//   );
// }