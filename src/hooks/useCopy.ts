import { toast } from "sonner";
export const useCopy = () => {
  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
      return true;
    } catch (error) {
      toast.error("Failed to copy text: " + error);
      return false;
    }
  };

  return { copyToClipboard };
};
