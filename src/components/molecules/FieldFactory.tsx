import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { FieldConfig } from "@/types";
import { Textarea } from "../ui/textarea";

type Props = {
  config: FieldConfig;
  register: any;
  control: any;
  index?: number;
};

export const FieldFactory = ({ config, register, control }: Props) => {
  const {
    name,
    label,
    placeholder,
    type = "text",
    options,
    component: Custom,
    onChange,
    onBlur,
    onTouch,
    props,
  } = config;

  // If custom component provided, use Controller wrapper
  if (Custom) {
    return (
      <div className="mb-3">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Custom {...field} {...props} />}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-3">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((o) => (
                  <SelectItem key={String(o.value)} value={String(o.value)}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-3">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <Textarea {...register(name)} placeholder={placeholder} {...props} />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-3 flex items-center space-x-2">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={!!field.value}
              onCheckedChange={(v) => field.onChange(v)}
            />
          )}
        />
        {label && <span className="text-sm">{label}</span>}
      </div>
    );
  }

  // default: simple input (text/email/number)
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <Input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
