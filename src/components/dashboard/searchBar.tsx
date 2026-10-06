"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";

export function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("query") ?? "";
  const [searchValue, setSearchValue] = useState(urlQuery);
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlQuery === "") setSearchValue("");
  }, [urlQuery]);

  const [debouncedHandleChange, cancel] = useDebounceCallback(handleChange, 400);

  useEffect(() => cancel, [cancel]);

  function handleChange(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("page", "1");
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function clearInput() {
    cancel();
    setSearchValue("");
    handleChange("");
  }

  return (
    <div className="bg-background focus-within:border-ring/80 focus-within:ring-ring/40 flex h-10.5 w-full flex-row items-center gap-3 rounded-md border px-3 py-2 duration-200 focus-within:ring-3">
      <SearchIcon className="text-popover-foreground size-4 shrink-0" strokeWidth={1.8} />
      <input
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        className="placeholder:text-popover-foreground w-full font-light ring-0 outline-0 placeholder:font-light focus:ring-0 active:ring-0 [&::-webkit-search-cancel-button]:hidden"
        onChange={(e) => {
          setSearchValue(e.target.value);
          debouncedHandleChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") clearInput();
        }}
        value={searchValue}
      />

      {searchValue && (
        <Button variant="input" size="icon-sm" onClick={clearInput} aria-label="Clear search">
          <XIcon />
        </Button>
      )}
    </div>
  );
}
