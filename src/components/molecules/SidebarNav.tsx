import { memo } from "react";
import { TbFlameFilled, TbStar, TbFlame, TbStarFilled } from "react-icons/tb";
import { IoSparkles, IoSparklesOutline } from "react-icons/io5";
import { PiFolderStarDuotone, PiFolderStarFill } from "react-icons/pi";
import { MdWhatshot, MdOutlineWhatshot } from "react-icons/md";
import { Separator } from "../ui/separator";
import { routePaths } from "@/route";
import { SidebarMenuItems, TimeRangeMenu } from "../atoms/SidebarItem";

interface SidebarNavProps {
  navigator: (path: string) => void;
}

type NavItem = {
  name: string;
  label: string;
  icon?: React.ComponentType<any>;
  activeIcon?: React.ComponentType<any>;
  path: string;
  customComponent?: React.ComponentType<any>;
  customComponentProps?: Record<string, any>;
};

type NavGroups = { group: string; items: NavItem[] };

export const SidebarNav = memo((props: SidebarNavProps) => {
  const { navigator } = props;

  const navItems: NavGroups[] = [
    {
      group: "Palette",
      items: [
        {
          name: "discover",
          label: "Discover",
          icon: TbStar,
          activeIcon: TbStarFilled,
          path: routePaths.home,
        },
        {
          name: "popular",
          label: "Popular",
          icon: TbFlame,
          activeIcon: TbFlameFilled,
          path: routePaths.palettePopular,
          customComponent: TimeRangeMenu,
          customComponentProps: {
            title: "Popular",
            icon: TbFlame,
            activeIcon: TbFlameFilled,
          },
        },
        {
          name: "random",
          label: "Random",
          icon: IoSparklesOutline,
          activeIcon: IoSparkles,
          path: routePaths.paletteRandom,
        },
        {
          name: "generate",
          label: "Generate",
          icon: IoSparklesOutline,
          activeIcon: IoSparkles,
          path: routePaths.paletteGenerate,
        },
        {
          name: "collections",
          label: "Collections",
          icon: PiFolderStarDuotone,
          activeIcon: PiFolderStarFill,
          path: routePaths.paletteCollections,
        },
      ],
    },
    { group: "Separator", items: [] },
    {
      group: "Color",
      items: [
        {
          name: "new",
          label: "New",
          icon: MdWhatshot,
          activeIcon: MdOutlineWhatshot,
          path: routePaths.colorNew,
        },
        {
          name: "random",
          label: "Random",
          icon: IoSparklesOutline,
          activeIcon: IoSparkles,
          path: routePaths.colorRandom,
        },
        {
          name: "collections",
          label: "Collections",
          icon: PiFolderStarDuotone,
          activeIcon: PiFolderStarFill,
          path: routePaths.colorCollections,
        },
      ],
    },
  ];

  return (
    <nav className="flex-1 p-4">
      <ul className="flex flex-col gap-2 font-medium">
        {navItems.map((group) =>
          group.group === "Separator" ? (
            <Separator
              key="separator"
              className="border-dashed rounded-2xl my-2"
            />
          ) : (
            <div key={group.group}>
              <h2 className="text-lg font-semibold mb-2 text-muted-foreground">
                {group.group}
              </h2>
              {group.items.map((item) => {
                const CustomComponent =
                  item?.customComponent as React.ComponentType<any>;
                return CustomComponent ? (
                  <CustomComponent
                    key={item.name}
                    {...item}
                    {...item.customComponentProps}
                    onClick={() => navigator(item.path)}
                  />
                ) : (
                  <SidebarMenuItems
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    path={item.path}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    onClick={(path) => navigator(path)}
                  />
                );
              })}
            </div>
          )
        )}
      </ul>
    </nav>
  );
});
