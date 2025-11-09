import { useNavigator } from "@/hooks/useNavigator";
import { cn } from "@/shared/lib/utils";
import { memo, type ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

interface SidebarMenuItemsProps {
  name: string;
  label: string;
  icon?: ComponentType<IconBaseProps>;
  activeIcon?: ComponentType<IconBaseProps>;
  path: string;
  onClick?: (path: string) => void;
}

export const SidebarMenuItems = memo<SidebarMenuItemsProps>(
  (props: SidebarMenuItemsProps) => {
    const {
      name,
      label,
      icon: IconComponent,
      activeIcon: ActiveIconComponent,
      path,
      onClick,
    } = props;

    const { currentPath } = useNavigator();

    const isActive = currentPath === path;
    console.log(
      "Current Path:",
      currentPath,
      "Item Path:",
      path,
      "Is Active:",
      isActive
    );

    const menuItemsClasses = cn(
      "flex items-center gap-3 text-muted-foreground p-2 cursor-pointer",
      "rounded-md",
      "transform transition-all duration-200",
      "hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground"
    );

    return (
      <li onClick={() => onClick?.(path)} className={menuItemsClasses}>
        {isActive && ActiveIconComponent ? (
          <ActiveIconComponent
            className={cn("w-5 h-5")}
            aria-label={`${name}-navIcon`}
          />
        ) : IconComponent ? (
          <IconComponent
            className={cn("w-5 h-5")}
            aria-label={`${name}-navIcon`}
          />
        ) : null}
        {label}
      </li>
    );
  }
);

SidebarMenuItems.displayName = "SidebarMenuItems";
