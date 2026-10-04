import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="group border-border bg-background flex w-full flex-row items-center gap-3 rounded-md border px-3 py-2">
      <SearchIcon className="text-popover-foreground size-4 shrink-0" strokeWidth={1.8} />
      <input
        placeholder={placeholder}
        className="placeholder:text-popover-foreground w-full font-light ring-0 outline-0 placeholder:font-light focus:ring-0 active:ring-0"
      />
      <Button variant="input" size="icon-sm">
        <XIcon />
      </Button>
    </div>
  );
}
