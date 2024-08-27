import type { PropsWithChildren } from "react";

export interface BaseComponentProps extends PropsWithChildren {
  id: string;
  name: string;
}
