import { z } from "zod";
import { DynamicForm } from "@/components/organisms/DynamicForm";
import { useFormStore } from "@/hooks/useFormStore";
import { FieldTypeEnum, type FormConfig } from "@/shared/types";

const FORM_ID = "TEST_FORM";

// Define schema using Zod
const testFormSchema = z.object({
  singleString: z.string().min(1, "Required"),
  multiString: z.string().min(1, "Required"),
  number: z.number().min(0, "Must be positive"),
  checkbox: z.boolean(),
  switch: z.boolean(),
  radio: z.string().min(1, "Please select an option"),
  singleSelect: z.string().min(1, "Please select an option"),
  multiSelect: z.array(z.string()).min(1, "Select at least one"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color"),
});

// Define form configuration
const testFormConfig: FormConfig = [
  {
    name: "singleString",
    label: "Single String Input",
    type: FieldTypeEnum.TEXT,
    placeholder: "Enter text",
  },
  {
    name: "multiString",
    label: "Multi String Input",
    type: FieldTypeEnum.TEXTAREA,
  },
  {
    name: "number",
    label: "Number Input",
    type: FieldTypeEnum.NUMBER,
    placeholder: "Enter number",
  },
  {
    name: "checkbox",
    label: "Accept terms and conditions",
    type: FieldTypeEnum.CHECKBOX,
  },
  {
    name: "switch",
    label: "Enable notifications",
    type: FieldTypeEnum.SWITCH,
  },
  {
    name: "radio",
    label: "Radio Input",
    type: FieldTypeEnum.RADIO,
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
      { label: "Option 3", value: "opt3" },
    ],
  },
  {
    name: "singleSelect",
    label: "Single Select Input",
    placeholder: "Choose an option",
    type: FieldTypeEnum.SELECT,
    options: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
  },
  {
    name: "multiSelect",
    label: "Multi Select Input",
    type: FieldTypeEnum.MULTISELECT,
    options: [
      { label: "Tag 1", value: "tag1" },
      { label: "Tag 2", value: "tag2" },
      { label: "Tag 3", value: "tag3" },
      { label: "Tag 4", value: "tag4" },
    ],
  },
  {
    name: "color",
    label: "Color Input",
    type: FieldTypeEnum.COLOR,
  },
];

const TestFormPage: React.FC = () => {
  const { values } = useFormStore(FORM_ID);

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Form Input Components Test</h1>

      <DynamicForm
        id={FORM_ID}
        schema={testFormSchema}
        config={testFormConfig}
        onSubmit={handleSubmit}
        className="space-y-6"
      />

      <div className="border border-border p-4 rounded bg-muted mt-6">
        <h2 className="text-xl font-semibold mb-3 text-foreground">
          Form State
        </h2>
        <pre className="text-sm overflow-auto text-foreground">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestFormPage;
