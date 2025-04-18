"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormBuilderCanvas from "./form-builder-canvas";
import FieldEditor from "./field-editor";
import FormPreview from "./form-preview";
import CodePreview from "./code-preview";
import { Eye, Code } from "lucide-react";

export default function FormBuilderLayout() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Builder */}
        <div className="space-y-6">
          <FormBuilderCanvas />
          <FieldEditor />
        </div>

        {/* Right panel - Preview/Code */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye size={16} /> טופס חי
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code size={16} /> קוד
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="space-y-4">
              <FormPreview />
            </TabsContent>
            <TabsContent value="code" className="space-y-4">
              <CodePreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
