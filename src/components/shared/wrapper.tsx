import { WrapperProps } from "@/types/sharedComponents";

export function Wrapper({ children }: WrapperProps) {
  return <div className="mx-auto h-full w-full max-w-7xl px-5 md:px-6 lg:px-8">{children}</div>;
}
