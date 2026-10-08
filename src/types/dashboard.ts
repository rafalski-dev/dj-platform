import { EventStatus } from "../../generated";

export type PageHeaderProps = {
  titleText: string;
  labelText?: string;
  buttonText?: string;
};

// Statusy wydarzeń z Prismy + "New" dla klienta bez wydarzeń
export type ClientStatus = EventStatus | "New";
