"use client";

import { Tabs } from "@/components/shared/tabs";
import { UrlMethod } from "./urlMethod";
import { KeyboardIcon, LinkIcon } from "lucide-react";
import { SearchMethod } from "./searchMethod";
import { useState } from "react";
import { songDataType } from "./songsCard";

const tabsData = [
  { label: "YouTube URL", value: "link", icon: <LinkIcon /> },
  { label: "Search", value: "search", icon: <KeyboardIcon /> },
];

export function SongPicker({ addSong }: { addSong: (songData: songDataType) => void }) {
  const [searchMethod, setSearchMethod] = useState(tabsData[0].value);

  return (
    <>
      <Tabs
        items={tabsData}
        defaultItem={tabsData[0].value}
        onTabChange={(value) => setSearchMethod(value)}
      />
      {searchMethod === "link" ? (
        <UrlMethod addSong={addSong} />
      ) : (
        <SearchMethod addSong={addSong} />
      )}
    </>
  );
}
