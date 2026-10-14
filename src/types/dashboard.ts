import { EventStatus } from "../../generated";

// Statusy wydarzeń z Prismy + "New" dla klienta bez wydarzeń
export type ClientStatus = EventStatus | "New";
