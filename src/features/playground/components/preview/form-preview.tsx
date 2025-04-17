// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useState } from "react";
// import { useFormBuilder } from "../../context/form-builder-context";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { EyeIcon } from "lucide-react";

// export default function FormPreview() {
//   const { fields } = useFormBuilder();
//   const [formData, setFormData] = useState<Record<string, any>>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("הטופס נשלח בהצלחה!", {
//       description: "הערכים שנשלחו:",
//       action: {
//         label: "הצג",
//         onClick: () => console.log(formData),
//       },
//     });
//     console.log(formData);
//   };

//   const handleChange = (name: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   if (fields.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-full p-8">
//         <p className="text-muted-foreground text-center">
//           הוסף שדות לטופס כדי לראות תצוגה מקדימה
//         </p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {fields.map((field) => {
//         const value = formData[field.name] || "";

//         return (
//           <div key={field.id} className="space-y-2">
//             {field.type !== "checkbox" && field.label && (
//               <Label htmlFor={field.id}>
//                 {field.label}
//                 {field.required && (
//                   <span className="text-destructive mr-1">*</span>
//                 )}
//               </Label>
//             )}

//             {(() => {
//               switch (field.type) {
//                 case "text":
//                 //     case "password":
//                 case "email":
//                 case "number":
//                   return (
//                     <Input
//                       id={field.id}
//                       type={field.type}
//                       placeholder={field.placeholder}
//                       value={value}
//                       onChange={(e) => handleChange(field.name, e.target.value)}
//                       required={field.required}
//                     />
//                   );
//                 case "password":
//                   return (
//                     <div className="relative">
//                       <Input
//                         id={field.id}
//                         type="password"
//                         placeholder={field.placeholder}
//                         value={value}
//                         onChange={(e) =>
//                           handleChange(field.name, e.target.value)
//                         }
//                         required={field.required}
//                         className={
//                           field.passwordOptions?.showToggle ? "pr-10" : ""
//                         }
//                       />
//                       {field.passwordOptions?.showToggle && (
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
//                           onClick={() => {
//                             /* טוגל תצוגת סיסמה */
//                           }}
//                         >
//                           <EyeIcon className="h-4 w-4" />
//                         </Button>
//                       )}
//                       {field.passwordOptions?.showStrengthIndicator &&
//                         value && (
//                           <div className="mt-2 mb-3">
//                             <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
//                               <div
//                                 className="h-full bg-primary"
//                                 style={{
//                                   width: `${
//                                     value.length > 10 ? 100 : value.length * 10
//                                   }%`,
//                                 }}
//                               ></div>
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   );
//                 case "checkbox":
//                   return (
//                     <div className="flex items-center space-x-2 space-x-reverse">
//                       <Checkbox
//                         id={field.id}
//                         checked={!!value}
//                         onCheckedChange={(checked) =>
//                           handleChange(field.name, checked)
//                         }
//                         required={field.required}
//                       />
//                       {field.label && (
//                         <Label htmlFor={field.id}>
//                           {field.label}
//                           {field.required && (
//                             <span className="text-destructive mr-1">*</span>
//                           )}
//                         </Label>
//                       )}
//                     </div>
//                   );

//                 case "select":
//                   return (
//                     <Select
//                       value={value}
//                       onValueChange={(value) => handleChange(field.name, value)}
//                       required={field.required}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder={field.placeholder} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {field.options?.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   );

//                 case "textarea":
//                   return (
//                     <Textarea
//                       id={field.id}
//                       placeholder={field.placeholder}
//                       value={value}
//                       onChange={(e) => handleChange(field.name, e.target.value)}
//                       required={field.required}
//                     />
//                   );

//                 default:
//                   return null;
//               }
//             })()}
//           </div>
//         );
//       })}

//       <Button type="submit" className="mt-4">
//         שלח
//       </Button>
//     </form>
//   );
// }
