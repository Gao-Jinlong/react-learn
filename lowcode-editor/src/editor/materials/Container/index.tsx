import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="min-h-[100px] border border-[#000] p-[20px]">
      {children}
    </div>
  );
}
