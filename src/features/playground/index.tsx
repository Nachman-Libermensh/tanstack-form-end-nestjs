"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormBuilderCanvas from "./components/canvas";
import FieldEditor from "./components/editors";
import FieldPalette from "./components/toolbar/field-palette";
import ActionButtons from "./components/toolbar/action-buttons";
import FormPreview from "./components/preview/form-preview";
import { UILibrarySelector } from "./components/toolbar/ui-library-selector";

export default function FormBuilderLayout() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">בונה טפסים</h1>
        <div className="flex items-center gap-4">
          <UILibrarySelector />
          <ActionButtons />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>עיצוב טופס</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div
              id="field-palette"
              className="p-2 border rounded-md bg-muted/20"
            >
              <FieldPalette />
            </div>
            <FormBuilderCanvas />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <Tabs defaultValue="edit">
            <CardHeader className="border-b p-0">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="edit">עריכת שדה</TabsTrigger>
                <TabsTrigger value="preview">תצוגה מקדימה</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="p-4">
              <TabsContent value="edit" className="mt-0">
                <FieldEditor />
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <FormPreview />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
