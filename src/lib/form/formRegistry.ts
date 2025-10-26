import type { FieldValues, UseFormReturn } from "react-hook-form";

type Listener = () => void;

class FormRegistry {
  private forms = new Map<string, UseFormReturn<any>>();
  private listeners = new Set<Listener>();

  register<T extends FieldValues>(id: string, methods: UseFormReturn<T>) {
    this.forms.set(id, methods as UseFormReturn<any>);
    this.emit();
  }

  unregister(id: string) {
    this.forms.delete(id);
    this.emit();
  }

  get<T extends FieldValues = any>(id: string): UseFormReturn<T> | undefined {
    return this.forms.get(id) as UseFormReturn<T> | undefined;
  }

  getValues<T = any>(id: string): T | undefined {
    return this.forms.get(id)?.getValues() as T | undefined;
  }

  setValue<T = any>(
    id: string,
    name: keyof T | string,
    value: any,
    options?: {
      shouldDirty?: boolean;
      shouldTouch?: boolean;
      shouldValidate?: boolean;
    }
  ) {
    this.forms.get(id)?.setValue(name as string, value, options);
    this.emit();
  }

  reset<T = any>(id: string, values?: Partial<T>) {
    this.forms.get(id)?.reset(values);
    this.emit();
  }

  async submit(id: string) {
    const methods = this.forms.get(id);
    if (!methods) return;
    // triggers validation and onSubmit inside the form component
    await methods.handleSubmit(() => {
      // default: do nothing — the actual onSubmit passed to <DynamicForm> runs too
      // but exposing this allows external submit attempt
      // If you want to intercept, you can pass custom callback here
      // keep empty
    })();
    this.emit();
  }

  trigger(id: string, name?: string | string[]) {
    return this.forms.get(id)?.trigger(name);
  }

  setError(
    id: string,
    name: string,
    error: { type?: string; message?: string }
  ) {
    this.forms.get(id)?.setError(name, {
      type: error.type ?? "manual",
      message: error.message,
    });
    this.emit();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit() {
    for (const l of Array.from(this.listeners)) {
      try {
        l();
      } catch (e) {
        /* ignore listener errors */
      }
    }
  }
}

export const formRegistry = new FormRegistry();
export default formRegistry;
