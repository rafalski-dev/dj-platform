import { Client, EventStatus } from "../../generated";

export type PageHeaderProps = {
  labelText: string;
  titleText: string;
  buttonText: string;
};

// Statusy wydarzeń z Prismy + "New" dla klienta bez wydarzeń
export type ClientStatus = EventStatus | "New";

export type ClientWithStatus = Client & { status: ClientStatus };

export type CardData = {
  title: string;
};

export type FiltersProps = {
  all: string;
  firstCategory: string;
  secondCategory?: string;
  thirdCategory?: string;
};
