import React, { ReactNode } from "react";

let hydrating = true;

export function useHydrated() {
  const [hydrated, setHydrated] = React.useState(() => !hydrating);

  React.useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
}

type ClientOnlyProps = React.PropsWithChildren<{
  fallback?: ReactNode;
}>;

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return <>{useHydrated() ? children : fallback}</>;
}

export const classNames = (...classes: string[]) => classes.join(" ");
