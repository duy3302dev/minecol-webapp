import { PaletteCard } from "@/components/molecules/PaletteCard";

export const PalettePage: React.FC = () => {
  const palettes = [
    {
      color: ["#FF5733", "#33FF57", "#3357FF"],
      mark: 1000,
      createAt: new Date("2024-06-01"),
    },
    {
      color: ["#FAD02E", "#F28D35", "#D7263D"],
      mark: 209,
      createAt: new Date("2024-05-20"),
    },
    {
      color: ["#7FDBFF", "#39CCCC", "#3D9970", "#3D9970"],
      mark: 9992,
      createAt: new Date("2024-04-10"),
    },
    {
      color: ["#F6E27F", "#BFA5A0", "#8D6B83", "#3D9970"],
      mark: 1,
      createAt: new Date("2024-03-15"),
    },
    {
      color: ["#222831", "#393E46", "#00ADB5"],
      mark: 23,
      createAt: new Date(),
    },
  ];

  const navItemClass = "text-lg font-bold hover:text-blue-600 cursor-pointer h-10 flex items-center bg-gray-200 rounded-md p-2";
  return (
    <div className=" min-w-screen flex">
      <nav className="w-1/6 bg-white">
        <ul className="flex flex-col gap-2 p-3">
          <li className={navItemClass}>New</li>  
          <li className="text-lg font-bold hover:text-blue-600">Popular</li>
          <li className="text-lg font-bold hover:text-blue-600">Colection</li>
          <li className="text-lg font-bold hover:text-blue-600">Random</li>
        </ul>
      </nav>
      <section className="pl-4 flex flex-col w-5/6">
        <h1 className="text-3xl font-bold mb-6">Color Palettes</h1>
        <div className="grid grid-cols-3 w-full">
          {palettes.map((palette, index) => (
            <div key={index} className="mb-6">
              <PaletteCard
                color={palette.color}
                like={palette.mark}
                createdAt={palette.createAt}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
