import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const StringInput = (props:) => {
  const { name, label, control } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type="text" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};