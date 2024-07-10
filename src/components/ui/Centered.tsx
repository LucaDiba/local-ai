import { ReactNode } from "react";

export function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full">
      {children}
    </div>
  );
}