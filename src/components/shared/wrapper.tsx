type Props = {
  children: React.ReactNode;
};

export function Wrapper({ children }: Props) {
  return <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-7">{children}</div>;
}
