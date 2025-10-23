import { Button } from "../ui/button";
import { FiChrome } from "react-icons/fi";
import z from "zod";
import type { FormConfig } from "@/types";
import { FormID } from "@/lib/form/formIdManagerment";
import { DynamicForm } from "../organisms/DynamicForm";

type MainLayoutProps = {
  children: React.ReactNode;
};

const searchSchema = z.object({
  search: z.string().trim(),
});

const searchConfig: FormConfig = [
  { name: "search", placeholder: "Search palette", type: "text" },
];

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  // const { values, setValue, reset, submit, isDirty, isValid } =
  //   useFormStore<any>(FormID.SEARCH);

  const handleSearchChange = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-stone-900 p-4 min-w-screen flex items-center justify-between">
        <h1 className="text-2xl font-bold">Minecol WebApp</h1>
        <div className="w-1/2 flex items-center gap-2">
          <DynamicForm
            config={searchConfig}
            id={FormID.SEARCH}
            schema={searchSchema}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-gradient-to-tr from-green-500 to-red-500 text-black hover:text-white"
          >
            <FiChrome size={16} /> Chrome Extension
          </Button>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">{children}</main>
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-sm text-gray-600">
          © 2024 Minecol. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
