import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { FormConfig } from "@/types";
import { useFormStore } from "@/hooks/useFormStore";
import { DynamicForm } from "../organisms/DynamicForm";

// define schema
const profileSchema = z.object({
  name: z.string().min(1, "Tên bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  role: z.string().min(1, "Chọn role"),
  bio: z.string().optional(),
  newsletter: z.boolean().optional(),
});

// form config
const formConfig: FormConfig = [
  { name: "name", label: "Name", placeholder: "Your name", type: "text" },
  { name: "email", label: "Email", placeholder: "you@mail.com", type: "email" },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
  },
  { name: "bio", label: "Bio", type: "textarea", placeholder: "Short bio..." },
  { name: "newsletter", label: "Subscribe to newsletter", type: "checkbox" },
];

export function ProfileFormExample() {
  const formId = "PROFILE_FORM"; // enum-like id (you said you'll use enums)
  const { values, setValue, reset, submit, isDirty, isValid } =
    useFormStore<any>(formId);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Profile Form</h3>
        <DynamicForm
          id={formId}
          schema={profileSchema}
          config={formConfig}
          onSubmit={(data: any) => {
            console.log("Submitted data", data);
            // you can still call external APIs here
          }}
        />
        <div className="mt-3 flex gap-2">
          <Button onClick={() => submit()}>Trigger external submit()</Button>
          <Button onClick={() => reset()}>Reset</Button>
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg font-semibold mb-3">Debug Panel</h3>
        <pre className="rounded p-3 bg-surface-1 text-xs">
          {JSON.stringify(values ?? {}, null, 2)}
        </pre>
        <div className="mt-3 text-sm">
          <div>isDirty: {String(isDirty)}</div>
          <div>isValid: {String(isValid)}</div>
        </div>
        <div className="mt-3">
          <Button onClick={() => setValue("name", "Demo Name")}>
            Set Name Programmatically
          </Button>
        </div>
      </div> */}
    </div>
  );
}
