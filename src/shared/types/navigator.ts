export interface NavigationEvent {
  from: string;
  to: string;
  state?: any;
  isReplace?: boolean;
  isPopState?: boolean;
}

export interface UseNavigatorOptions {
  onBeforeLeave?: (
    event: NavigationEvent
  ) => Promise<boolean | void> | boolean | void;
  onAfterEnter?: (event: NavigationEvent) => Promise<void> | void;
  enableTransition?: boolean;
}

export interface UseNavigatorReturn {
  currentPath: string;
  previousPath: string;
  isNavigating: boolean;
  navigate: (path: string, state?: any) => Promise<boolean>;
  replace: (path: string, state?: any) => Promise<boolean>;
  goBack: () => void;
  goForward: () => void;
}
