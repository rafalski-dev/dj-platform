"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useTranslations } from "next-intl";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";

export function SearchBar({ placeholder }: { placeholder: string }) {
  const t = useTranslations("Admin.SearchBar");
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

  function handleChange(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
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
    <InputGroup>
      <InputGroupInput
        placeholder={placeholder}
        type="search"
        aria-label={placeholder}
        className="[&::-webkit-search-cancel-button]:hidden"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          debouncedHandleChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") clearInput();
        }}
        autoComplete="off"
      />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      {searchValue && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm" onClick={clearInput} aria-label={t("clear")}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
