import formRegistry from "@/shared/lib/form/formRegistry";
import { useFormStoreCore } from "@/shared/store/form.store";
import type { FieldValues } from "react-hook-form";

/**
 * useFormStore(id) -> reactive read of values/errors for that form ID
 * returns helpers to operate on that form instance
 */
export function useFormStore<T extends FieldValues = FieldValues>(id: string) {
  const tick = useFormStoreCore((s) => s.tick);

  const methods = formRegistry.get<T>(id);

  const values = methods?.getValues() as T | undefined;
  const errors = methods?.formState?.errors;
  const isDirty = methods?.formState?.isDirty ?? false;
  const isValid = methods?.formState?.isValid ?? false;

  const setValue = (
    name: keyof T | string,
    value: T[keyof T] | unknown,
    options?: {
      shouldDirty?: boolean;
      shouldTouch?: boolean;
      shouldValidate?: boolean;
    }
  ) => {
    formRegistry.setValue<T>(id, name, value, options);
  };

  const reset = (values?: Partial<T>) => {
    formRegistry.reset<T>(id, values);
  };

  const submit = async () => {
    await formRegistry.submit(id);
  };

  const trigger = async (name?: string | string[]) => {
    return await formRegistry.trigger(id, name);
  };

  return {
    methods,
    values,
    errors,
    isDirty,
    isValid,
    setValue,
    reset,
    submit,
    trigger,
    tick, // mainly for debug
  };
}
