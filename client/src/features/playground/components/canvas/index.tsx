// "use client";
// import { useFormBuilder } from "../../context/form-builder-context";
// import CanvasField from "./canvas-field";

// export default function FormBuilderCanvas() {
//   const { fields, selectedFieldId, selectField } = useFormBuilder();

//   return (
//     <div className="border rounded p-4 min-h-[300px] bg-background">
//       {fields.length === 0 && (
//         <div className="h-full flex items-center justify-center">
//           <p className="text-muted-foreground text-center">
//             גרור שדות מהתפריט לכאן כדי ליצור את הטופס שלך
//             <br />
//             <span className="text-sm">או לחץ על כפתורי התוספת למעלה</span>
//           </p>
//         </div>
//       )}

//       <div className="space-y-2">
//         {fields.map((field, index) => (
//           <CanvasField
//             key={field.id}
//             field={field}
//             isSelected={selectedFieldId === field.id}
//             onClick={() => selectField(field.id)}
//             index={index}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
