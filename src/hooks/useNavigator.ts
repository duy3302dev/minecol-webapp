import type {
  UseNavigatorOptions,
  UseNavigatorReturn,
} from "@/shared/types/navigator";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useNavigator = (
  options: UseNavigatorOptions = {}
): UseNavigatorReturn => {
  const { onBeforeLeave, onAfterEnter, enableTransition = true } = options;

  // Use React Router hooks
  const reactRouterNavigate = useNavigate();
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState<string>(location.pathname);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const previousPathRef = useRef<string>(currentPath);

  // Sync currentPath with React Router location
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const navigate = useCallback(
    async (newPath: string, state: any = {}): Promise<boolean> => {
      const previousPath = currentPath;

      try {
        setIsNavigating(true);

        if (onBeforeLeave) {
          const shouldContinue = await onBeforeLeave({
            from: previousPath,
            to: newPath,
            state,
          });

          if (shouldContinue === false) {
            setIsNavigating(false);
            return false;
          }
        }

        reactRouterNavigate(newPath, { state });

        setCurrentPath(newPath);
        previousPathRef.current = previousPath;

        if (enableTransition) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        if (onAfterEnter) {
          await onAfterEnter({
            from: previousPath,
            to: newPath,
            state,
          });
        }

        setIsNavigating(false);
        return true;
      } catch (error) {
        console.error("Navigation error:", error);
        setIsNavigating(false);
        return false;
      }
    },
    [
      currentPath,
      reactRouterNavigate,
      onBeforeLeave,
      onAfterEnter,
      enableTransition,
    ]
  );

  const replace = useCallback(
    async (newPath: string, state: any = {}): Promise<boolean> => {
      const previousPath = currentPath;

      try {
        setIsNavigating(true);

        if (onBeforeLeave) {
          const shouldContinue = await onBeforeLeave({
            from: previousPath,
            to: newPath,
            state,
            isReplace: true,
          });

          if (shouldContinue === false) {
            setIsNavigating(false);
            return false;
          }
        }

        // Use React Router with replace option instead of window.history.replaceState
        reactRouterNavigate(newPath, { state, replace: true });

        setCurrentPath(newPath);
        previousPathRef.current = previousPath;

        if (onAfterEnter) {
          await onAfterEnter({
            from: previousPath,
            to: newPath,
            state,
            isReplace: true,
          });
        }

        setIsNavigating(false);
        return true;
      } catch (error) {
        console.error("Replace error:", error);
        setIsNavigating(false);
        return false;
      }
    },
    [currentPath, reactRouterNavigate, onBeforeLeave, onAfterEnter]
  );

  const goBack = useCallback((): void => {
    // Use React Router's negative navigation
    reactRouterNavigate(-1);
  }, [reactRouterNavigate]);

  const goForward = useCallback((): void => {
    // Use React Router's positive navigation
    reactRouterNavigate(1);
  }, [reactRouterNavigate]);

  // Handle popstate events from React Router
  useEffect(() => {
    const handleLocationChange = async (): Promise<void> => {
      const newPath = location.pathname;
      const previousPath = currentPath;

      // Skip if path hasn't actually changed
      if (newPath === previousPath) return;

      setIsNavigating(true);

      if (onBeforeLeave) {
        await onBeforeLeave({
          from: previousPath,
          to: newPath,
          state: location.state,
          isPopState: true,
        });
      }

      setCurrentPath(newPath);
      previousPathRef.current = previousPath;

      if (onAfterEnter) {
        await onAfterEnter({
          from: previousPath,
          to: newPath,
          state: location.state,
          isPopState: true,
        });
      }

      setIsNavigating(false);
    };

    handleLocationChange();
  }, [location, currentPath, onBeforeLeave, onAfterEnter]);

  return {
    currentPath,
    previousPath: previousPathRef.current,
    isNavigating,
    navigate,
    replace,
    goBack,
    goForward,
  };
};
