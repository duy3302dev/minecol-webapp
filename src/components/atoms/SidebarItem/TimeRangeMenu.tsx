import { memo, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { useNavigator } from "@/hooks/useNavigator";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

interface TimeRangeOption {
  label: string;
  value: string;
  onClick: () => void;
}

interface TimeRangeMenuProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  activeIcon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  path?: string;
}

export const TimeRangeMenu = memo((props: TimeRangeMenuProps) => {
  const { title, onClick, icon, activeIcon, path } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isItemActive, setIsItemActive] = useState<string | null>(null);

  const Icon = icon;
  const ActiveIcon = activeIcon;

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const timeParam = searchParams.get("time");

  const handleToggle = () => {
    if (!isExpanded) {
      onClick && onClick();
    }
    setIsExpanded((prev) => !prev);
  };

  const handleItemClick = (
    itemOnClick: () => void,
    value: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    itemOnClick();
    setIsItemActive(value);
    // Optional: Auto-close after selection if desired
    // setIsExpanded(false);
  };

  useEffect(() => {
    if (timeParam) {
      setIsItemActive(timeParam);
    }
  }, [searchParams, path]);

  // Collapse menu when pathname changes (navigating to different path)
  useEffect(() => {
    if (location.pathname !== path) setIsExpanded(false);
  }, [location.pathname]);

  const TimeRangeItems: TimeRangeOption[] = [
    {
      label: "Daily",
      value: "daily",
      onClick: () => setSearchParams({ time: "daily" }),
    },
    {
      label: "Weekly",
      value: "weekly",
      onClick: () => setSearchParams({ time: "weekly" }),
    },
    {
      label: "Monthly",
      value: "monthly",
      onClick: () => setSearchParams({ time: "monthly" }),
    },
    {
      label: "All Time",
      value: "all",
      onClick: () => setSearchParams({ time: "all" }),
    },
  ];

  const menuItemsClasses = cn(
    "flex flex-col text-muted-foreground cursor-pointer",
    "rounded-md",
    "transform transition-all duration-200",
    "hover:bg-accent hover:text-accent-foreground",
    isExpanded && "bg-accent text-accent-foreground border border-foreground"
  );

  const dropdownClasses = cn(
    "w-full flex flex-col",
    "overflow-hidden transition-all duration-300 ease-in-out",
    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
  );

  const dropdownInnerClasses = cn(
    "flex flex-col px-2 pt-2 pb-2 gap-1", // Padding only inside when expanded
    "dark:bg-background",
    isExpanded && "rounded-b-md shadow-md bg-white"
  );

  return (
    <div className={menuItemsClasses} onClick={handleToggle}>
      <div
        className={cn(
          "flex items-center gap-3 text-muted-foreground p-2 cursor-pointer",
          "rounded-md",
          "transform transition-all duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          isExpanded &&
            "bg-accent text-accent-foreground  border-b border-border rounded-t-md"
        )}
      >
        {Icon && !isExpanded ? (
          <Icon className={cn("w-5 h-5")} aria-label={`${title}-navIcon`} />
        ) : ActiveIcon && isExpanded ? (
          <ActiveIcon
            className={cn("w-5 h-5")}
            aria-label={`${title}-navIcon`}
          />
        ) : null}

        {title}
      </div>

      <div className={dropdownClasses}>
        <div className={dropdownInnerClasses}>
          {TimeRangeItems.map((item: TimeRangeOption, index) => (
            <div
              key={index}
              className={cn(
                `flex items-center p-1 pl-3 gap-2 w-full text-sm`,
                "rounded-full cursor-pointer",
                "hover:bg-accent hover:text-accent-foreground",
                "transition-all duration-200",
                isItemActive === item.value
                  ? "bg-accent text-accent-foreground"
                  : ""
              )}
              onClick={(e) => handleItemClick(item.onClick, item.value, e)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
