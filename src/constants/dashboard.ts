// Client panel: which event (or waiting inquiry) the pages show – "event:<id>" / "inquiry:<id>"
export const SELECTED_EVENT_COOKIE = "selectedEvent";

// Signed contract upload – shared by the upload tile (browser) and the actions (server).
// Photos are turned into JPG in the browser, so only these two types ever reach R2.
export const SIGNED_CONTRACT_MAX_SIZE = 10 * 1024 * 1024;
export const SIGNED_CONTRACT_TYPES = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
} as const;

export type SignedContractType = keyof typeof SIGNED_CONTRACT_TYPES;
