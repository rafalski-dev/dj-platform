"use client";

import { Tabs } from "@/components/shared/tabs";
import { UrlMethod } from "./urlMethod";
import { KeyboardIcon, LinkIcon } from "lucide-react";
import { SearchMethod } from "./searchMethod";
import { useState } from "react";
import { songDataType } from "./songsCard";

const tabsData = [
  { label: "Search", value: "search", icon: <KeyboardIcon /> },
  { label: "YouTube URL", value: "link", icon: <LinkIcon /> },
];

export function SongPicker({ addSong }: { addSong: (songData: songDataType) => void }) {
  const [searchMethod, setSearchMethod] = useState(tabsData[1].value);

  return (
    <>
      <Tabs
        items={tabsData}
        defaultItem={tabsData[1].value}
        onTabChange={(value) => setSearchMethod(value)}
      />
      {searchMethod === tabsData[0].value ? (
        <SearchMethod addSong={addSong} />
      ) : (
        <UrlMethod addSong={addSong} />
      )}
    </>
  );
}
