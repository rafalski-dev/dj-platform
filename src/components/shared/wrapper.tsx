type Props = {
  children: React.ReactNode;
};

export function Wrapper({ children }: Props) {
  return <div className="mx-auto w-full max-w-300 px-4">{children}</div>;
}
