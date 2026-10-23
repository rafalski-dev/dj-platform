export const clientStatsKeys = [
  { key: "newThisSeason" },
  { key: "activeClients" },
  { key: "withoutEvent" },
  { key: "needsAttention" },
] as const;

export const homeStatsKeys = [
  { key: "contracts" },
  { key: "pending" },
  { key: "activeWithoutContract" },
  { key: "activeWithoutPlaylist" },
] as const;
